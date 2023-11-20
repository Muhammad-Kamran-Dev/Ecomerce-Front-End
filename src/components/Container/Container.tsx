type Props = {
  className?: string;
  children: React.ReactNode;
};

const Container = ({ className, children }: Props) => {
  return <div className={`w-11/12 mx-auto ${className}`}>{children}</div>;
};

export default Container;
