export function Footer() {
  return (
    <footer className="border-t bg-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-neutral-500">
            © {new Date().getFullYear()} Claimyx Health. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-neutral-500 hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-neutral-500 hover:text-primary">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-neutral-500 hover:text-primary">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
