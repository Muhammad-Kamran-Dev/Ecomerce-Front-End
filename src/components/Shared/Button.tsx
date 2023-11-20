import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "@/components/ui/button";

type ButtonProps = {
  classNames?: string;
  children?: ReactNode;
  variant?:
    | "link"
    | "destructive"
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const CustomButton = ({
  classNames,
  children,
  variant,
  ...props
}: ButtonProps) => {
  return (
    <Button className={classNames} {...props} variant={variant}>
      {children}
    </Button>
  );
};

export default CustomButton;
