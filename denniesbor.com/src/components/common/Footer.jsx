const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="p-4 bg-gray-200 font-computer-modern text-center fixed bottom-0 w-full">
      &copy; {currentYear} Dennies Bor
    </footer>
  );
};

export default Footer;
