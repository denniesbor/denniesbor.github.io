const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="p-4 bg-[#F8F9FA] border-t border-gray-200 font-computer-modern text-center w-full mt-auto">
      <span className="text-gray-500 text-sm">
        &copy; {currentYear} Dennies Bor
      </span>
    </footer>
  );
};

export default Footer;
