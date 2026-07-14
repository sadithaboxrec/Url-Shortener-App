function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-gray-600 md:flex-row">
        <p>© 2026 Shortly</p>

        <div className="flex gap-6">
          <a href="#" className="hover:text-black">
            Privacy
          </a>
          <a href="#" className="hover:text-black">
            Terms
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;