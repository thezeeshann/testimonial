type Theme = "Dark" | "Light";

export type TSpace = {
  id: string;
  name: string;
  logo?: string;
  title: string;
  message: string;
  rating?: boolean;
  theme?: Theme;
  questionOne?: string;
  questionTwo?: string;
  questionThree?: string;
};
