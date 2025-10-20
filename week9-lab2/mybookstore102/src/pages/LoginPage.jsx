// นำเข้า Hooks และ Icons ที่จำเป็น
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon, UserIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

// Component สำหรับไอคอน Loading (Spinner)
const LoadingSpinner = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const LoginPage = () => {
  // State สำหรับจัดการข้อมูลในฟอร์ม
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // ฟังก์ชันที่ทำงานเมื่อกด Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // จำลองการส่งข้อมูลไปตรวจสอบที่ Backend (ใช้เวลา 1 วินาที)
    setTimeout(() => {
      if (username === 'bookstoreadmin' && password === 'ManageBook68') {
        localStorage.setItem('isAdminAuthenticated', 'true');
        navigate('/store-manager/all-book');
      } else {
        setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }
      setIsLoading(false); // สิ้นสุด Loading
    }, 1000);
  };

  return (
    // พื้นหลังหลักของหน้า
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">

        {/* ส่วนหัว: ไอคอนและชื่อฟอร์ม */}
        <div className="text-center">
          <LockClosedIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            เข้าสู่ระบบ BackOffice
          </h2>
        </div>

        {/* การ์ดฟอร์ม */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* แสดงข้อความ Error (ถ้ามี) */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4" role="alert">
                <p>{error}</p>
              </div>
            )}
            
            {/* ช่องกรอกชื่อผู้ใช้ */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                ชื่อผู้ใช้
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                  placeholder="กรอกชื่อผู้ใช้"
                />
              </div>
            </div>

            {/* ช่องกรอกรหัสผ่าน พร้อมปุ่มแสดง/ซ่อน */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                รหัสผ่าน
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                  placeholder="กรอกรหัสผ่าน"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            {/* ปุ่มเข้าสู่ระบบ */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner />
                    กำลังตรวจสอบ...
                  </>
                ) : (
                  'เข้าสู่ระบบ'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;