import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import LoadingSpinner from '../components/LoadingSpinner';

const BookListPage = () => {
  // 1. เหลือ State ไว้เฉพาะที่จำเป็น: books, loading, error
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. useEffect สำหรับดึงข้อมูลหนังสือ (ยังคงเดิม)
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";
        const response = await fetch(`${apiUrl}/api/v1/books`);
        
        if (!response.ok) {
          throw new Error('ไม่สามารถดึงข้อมูลหนังสือได้');
        }

        const data = await response.json();
        setBooks(data); // เก็บข้อมูลที่ได้มาลง State
        setError(null);

      } catch (err) {
        setError(err.message);
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []); // ทำงานแค่ครั้งเดียวเมื่อ Component โหลด

  // 3. จัดการสถานะ Loading และ Error
  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-600 mt-10">เกิดข้อผิดพลาด: {error}</p>;

  // 4. แสดงผลลิสต์หนังสือทั้งหมด
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        
        {/* ตรวจสอบว่ามีหนังสือหรือไม่ */}
        {books.length > 0 ? (
          // แสดงผลหนังสือในรูปแบบ Grid
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          // แสดงข้อความเมื่อไม่มีหนังสือในระบบ
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">ยังไม่มีหนังสือในระบบ</p>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default BookListPage;