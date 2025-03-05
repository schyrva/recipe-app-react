export function Footer() {
  return (
    <footer className="bg-muted py-6 text-center text-muted-foreground">
      <div className="container mx-auto">
        <p>© {new Date().getFullYear()} Recipe App by Stanislav Chyrva. All rights reserved.</p>
      </div>
    </footer>
  );
}
