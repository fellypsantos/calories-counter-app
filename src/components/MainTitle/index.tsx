import { CustomTitle } from './styles';

interface IProps {
  children: React.ReactNode
}

const MainTitle = ({ children }: IProps) => <CustomTitle>{children}</CustomTitle>;

export default MainTitle;
