const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main className="auth-page">{children}</main>;
};

export default AuthLayout;
