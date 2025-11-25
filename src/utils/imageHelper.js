// utils/imageHelper.js
export const getBookCoverSrc = (cover) => {
  if (!cover) return '/placeholder.jpg';
  
  // Jika URL lengkap, return langsung
  if (cover.startsWith('http://') || cover.startsWith('https://')) {
    return cover;
  }
  
  // Jika nama file lokal, tambahkan prefix
  return `/image/${cover}`;
};  