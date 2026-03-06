const PageContainer = ({ children, className = "" }) => (
  <main className={`mx-auto w-full max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:px-10 ${className}`}>{children}</main>
);

export default PageContainer;


