import { BlogType } from "@/interFace/interFace";
import blog1 from "../../public/assets/img/blog/b-1.jpg";
import blog2 from "../../public/assets/img/blog/b-2.jpg";
import blog3 from "../../public/assets/img/blog/b-3.jpg";
const blog_data: BlogType[] = [
  {
    id: 1,
    blogImg: blog1,
    category: "FASHION",
    date: "31 MAR 2021",
    title: "Worthy Cyber Monday Fashion From Ecomart",
  },
  {
    id: 2,
    blogImg: blog2,
    category: "FASHION",
    date: "31 MAR 2021",
    title: "Holiday Home Decoration I’ve Recently Ordered",
  },
  {
    id: 3,
    blogImg: blog3,
    category: "FASHION",
    date: "31 MAR 2021",
    title: "Unique Ideas for Fashion You Haven’t heard yet",
  },
];

export default blog_data;
