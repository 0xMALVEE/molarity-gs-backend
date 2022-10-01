--Local whitlist
local cfg_caching = false
local floor,modf = math.floor,math.modf
local char,format,rep = string.char,string.format,string.rep
local function bytes_to_w32 (a,b,c,d) return a*0x1000000+b*0x10000+c*0x100+d end

local function w32_to_bytes (i)
   return floor(i/0x1000000)%0x100,floor(i/0x10000)%0x100,floor(i/0x100)%0x100,i%0x100
end

local function w32_rot (bits,a)
   local b2 = 2^(32-bits)
   local a,b = modf(a/b2)
   return a+b*b2*(2^(bits))
end

local function cache2arg (fn)
   if not cfg_caching then return fn end
   local lut = {}
   for i=0,0xffff do
      local a,b = floor(i/0x100),i%0x100
      lut[i] = fn(a,b)
   end
   return function (a,b)
      return lut[a*0x100+b]
   end
end

local function byte_to_bits (b)
   local b = function (n)
      local b = floor(b/n)
      return b%2==1
   end
   return b(1),b(2),b(4),b(8),b(16),b(32),b(64),b(128)
end

local function bits_to_byte (a,b,c,d,e,f,g,h)
   local function n(b,x) return b and x or 0 end
   return n(a,1)+n(b,2)+n(c,4)+n(d,8)+n(e,16)+n(f,32)+n(g,64)+n(h,128)
end

local function bits_to_string (a,b,c,d,e,f,g,h)
   local function x(b) return b and "1" or "0" end
   return ("%s%s%s%s %s%s%s%s"):format(x(a),x(b),x(c),x(d),x(e),x(f),x(g),x(h))
end

local function byte_to_bit_string (b)
   return bits_to_string(byte_to_bits(b))
end

local function w32_to_bit_string(a)
   if type(a) == "string" then return a end
   local aa,ab,ac,ad = w32_to_bytes(a)
   local s = byte_to_bit_string
   return ("%s %s %s %s"):format(s(aa):reverse(),s(ab):reverse(),s(ac):reverse(),s(ad):reverse()):reverse()
end

local band = cache2arg (function(a,b)
    local A,B,C,D,E,F,G,H = byte_to_bits(b)
    local a,b,c,d,e,f,g,h = byte_to_bits(a)
    return bits_to_byte(
        A and a, B and b, C and c, D and d,
        E and e, F and f, G and g, H and h)
end)

local bor = cache2arg(function(a,b)
    local A,B,C,D,E,F,G,H = byte_to_bits(b)
    local a,b,c,d,e,f,g,h = byte_to_bits(a)
    return bits_to_byte(
        A or a, B or b, C or c, D or d,
        E or e, F or f, G or g, H or h)
end)
local bxor = cache2arg(function(a,b)
    local A,B,C,D,E,F,G,H = byte_to_bits(b)
    local a,b,c,d,e,f,g,h = byte_to_bits(a)
    return bits_to_byte(
        A ~= a, B ~= b, C ~= c, D ~= d,
        E ~= e, F ~= f, G ~= g, H ~= h)
end)

local function bnot (x)
   return 255-(x % 256)
end

local function w32_comb(fn)
   return function (a,b)
      local aa,ab,ac,ad = w32_to_bytes(a)
      local ba,bb,bc,bd = w32_to_bytes(b)
      return bytes_to_w32(fn(aa,ba),fn(ab,bb),fn(ac,bc),fn(ad,bd))
   end
end

local w32_and = w32_comb(band)
local w32_xor = w32_comb(bxor)
local w32_or = w32_comb(bor)

local function w32_xor_n (a,...)
   local aa,ab,ac,ad = w32_to_bytes(a)
   for i=1,select('#',...) do
      local ba,bb,bc,bd = w32_to_bytes(select(i,...))
      aa,ab,ac,ad = bxor(aa,ba),bxor(ab,bb),bxor(ac,bc),bxor(ad,bd)
   end
   return bytes_to_w32(aa,ab,ac,ad)
end

local function w32_or3 (a,b,c)
   local aa,ab,ac,ad = w32_to_bytes(a)
   local ba,bb,bc,bd = w32_to_bytes(b)
   local ca,cb,cc,cd = w32_to_bytes(c)
   return bytes_to_w32(
      bor(aa,bor(ba,ca)), bor(ab,bor(bb,cb)), bor(ac,bor(bc,cc)), bor(ad,bor(bd,cd))
   )
end

local function w32_not (a)
   return 4294967295-(a % 4294967296)
end
 
local function w32_add (a,b) return (a+b) % 4294967296 end
 
local function w32_add_n (a,...)
   for i=1,select('#',...) do
      a = (a+select(i,...)) % 4294967296
   end
   return a
end
local function w32_to_hexstring (w) return format("%08x",w) end
 
local function to_hex(msg)
   local H0,H1,H2,H3,H4 = 0x67452301,0xEFCDAB89,0x98BADCFE,0x10325476,0xC3D2E1F0
   local msg_len_in_bits = #msg * 8
   
   local first_append = char(0x80)
   
   local non_zero_message_bytes = #msg +1 +8
   local current_mod = non_zero_message_bytes % 64
   local second_append = current_mod>0 and rep(char(0), 64 - current_mod) or ""
   
   local B1, R1 = modf(msg_len_in_bits / 0x01000000)
   local B2, R2 = modf( 0x01000000 * R1 / 0x00010000)
   local B3, R3 = modf( 0x00010000 * R2 / 0x00000100)
   local B4 = 0x00000100 * R3
   
   local L64 = char( 0) .. char( 0) .. char( 0) .. char( 0)
   .. char(B1) .. char(B2) .. char(B3) .. char(B4)
   
   msg = msg .. first_append .. second_append .. L64
   
   assert(#msg % 64 == 0)
   
   local chunks = #msg / 64
   
   local W = { }
   local start, A, B, C, D, E, f, K, TEMP
   local chunk = 0
   
   while chunk < chunks do

      start,chunk = chunk * 64 + 1,chunk + 1
      
      for t = 0, 15 do
         W[t] = bytes_to_w32(msg:byte(start, start + 3))
         start = start + 4
      end
      

      for t = 16, 79 do
         W[t] = w32_rot(1, w32_xor_n(W[t-3], W[t-8], W[t-14], W[t-16]))
      end
      
      A,B,C,D,E = H0,H1,H2,H3,H4
      
      for t = 0, 79 do
         if t <= 19 then
           
            f = w32_or(w32_and(B, C), w32_and(w32_not(B), D))
            K = 0x5A827999
         elseif t <= 39 then
          
            f = w32_xor_n(B, C, D)
            K = 0x6ED9EBA1
         elseif t <= 59 then
          
            f = w32_or3(w32_and(B, C), w32_and(B, D), w32_and(C, D))
            K = 0x8F1BBCDC
         else
     
            f = w32_xor_n(B, C, D)
            K = 0xCA62C1D6
         end
         
        
         A,B,C,D,E = w32_add_n(w32_rot(5, A), f, E, W[t], K),
         A, w32_rot(30, B), C, D
      end
      
      H0,H1,H2,H3,H4 = w32_add(H0, A),w32_add(H1, B),w32_add(H2, C),w32_add(H3, D),w32_add(H4, E)
   end
   local f = w32_to_hexstring
   return f(H0) .. f(H1) .. f(H2) .. f(H3) .. f(H4)
end

--HWID SHIT
local ffi = require("ffi")

ffi.cdef[[
	typedef int(__cdecl* cpuInfoFN)();
	typedef long long          int64_t;
	typedef unsigned char      uint8_t;
	typedef wchar_t WCHAR;

	typedef struct CPUInformation
	{
		int	 m_Size;		// Size of this structure, for forward compatability.

		uint8_t m_nLogicalProcessors;		// Number op logical processors.
		uint8_t m_nPhysicalProcessors;	// Number of physical processors

		bool m_bRDTSC : 1,	// Is RDTSC supported?
			m_bCMOV  : 1,  // Is CMOV supported?
			m_bFCMOV : 1,  // Is FCMOV supported?
			m_bSSE	  : 1,	// Is SSE supported?
			m_bSSE2  : 1,	// Is SSE2 Supported?
			m_b3DNow : 1,	// Is 3DNow! Supported?
			m_bMMX   : 1,	// Is MMX supported?
			m_bHT	  : 1;	// Is HyperThreading supported?


		bool m_bSSE3 : 1,
			m_bSSSE3 : 1,
			m_bSSE4a : 1,
			m_bSSE41 : 1,
			m_bSSE42 : 1,
			m_bAVX   : 1;  // Is AVX supported?

		int64_t m_Speed;						// In cycles per second.

		WCHAR* m_szProcessorID;				// Processor vendor Identification.
		WCHAR* m_szProcessorBrand;			// Processor brand string, if available

		uint32_t m_nModel;
		uint32_t m_nFeatures[ 3 ];
		uint32_t m_nL1CacheSizeKb;
		uint32_t m_nL1CacheDesc;
		uint32_t m_nL2CacheSizeKb;
		uint32_t m_nL2CacheDesc;
		uint32_t m_nL3CacheSizeKb;
		uint32_t m_nL3CacheDesc;
	};

	typedef struct MaterialAdapterInfo_t
	{
		char m_pDriverName[512];
		unsigned int m_VendorID;
		unsigned int m_DeviceID;
		unsigned int m_SubSysID;
		unsigned int m_pheonix;
		int m_nDXSupportLevel;			// This is the *preferred* dx support level
		int m_nMinDXSupportLevel;
		int m_nMaxDXSupportLevel;
		unsigned int m_nDriverVersionHigh;
		unsigned int m_nDriverVersionLow;
	};

	typedef int(__thiscall* get_current_adapter_fn)(void*);
	typedef void(__thiscall* get_adapter_info_fn)(void*, int adapter, struct MaterialAdapterInfo_t& info);
]]

-- cpu things
local info_raw_sig = client.find_signature("engine.dll", "\xE8\xCC\xCC\xCC\xCC\x8B\x45\xFC\x83\xC6\x58") or error("[Error] 0x01")
local info_raw_offset = ffi.cast("char*", info_raw_sig) + 92
local info_raw_final = ffi.cast("void*", info_raw_offset)
local cpu_info_func = ffi.cast("cpuInfoFN", info_raw_final) or error("[Error] 0x02")
local cpu_info_raw = cpu_info_func()
local cpu_info = ffi.cast("struct CPUInformation*", cpu_info_raw) or error("[Error] 0x03")

-- gpu stuff
local mat_system_interface = client.create_interface("materialsystem.dll", "VMaterialSystem080") or error("[Error] 0x04")
local mat_system_raw = ffi.cast("void***", mat_system_interface) or error("[Error] 0x04")
local material_system = mat_system_raw[0]
local get_active_adapter = ffi.cast("get_current_adapter_fn", material_system[25]) or error("[Error] 0x05")
local get_adapter_info = ffi.cast("get_adapter_info_fn", material_system[26]) or error("[Error] 0x06")

local active_adapter = get_active_adapter(material_system)

local adapter_info = ffi.new("struct MaterialAdapterInfo_t")

get_adapter_info(material_system, active_adapter, adapter_info)

local function get_hwid()
	local cpu_id = ffi.string(ffi.cast("const char*", cpu_info.m_szProcessorID))
	local cpu_brand = ffi.string(ffi.cast("const char*", cpu_info.m_szProcessorBrand))
	local cpu_model = tostring(cpu_info.m_nModel)
	local gpu_device_name = ffi.string(adapter_info.m_pDriverName)
	local gpu_vendor_id = tostring(adapter_info.m_VendorID)
    local gpu_device_id = tostring(adapter_info.m_DeviceID)
    
    --client.color_log(255, 200, 0, "[Phoenix] Collecting user data...")

	return to_hex(cpu_id .. cpu_brand .. cpu_model .. gpu_device_name .. gpu_vendor_id .. gpu_device_id)
end





database.write("hdsaf87234kh02348asdfkgc", get_hwid())
