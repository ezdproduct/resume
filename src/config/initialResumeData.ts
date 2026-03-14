import { DEFAULT_FIELD_ORDER } from "./constants";
import { GlobalSettings, DEFAULT_CONFIG, ResumeData } from "../types/resume";

const initialGlobalSettings: GlobalSettings = {
  baseFontSize: 16,
  pagePadding: 32,
  paragraphSpacing: 12,
  lineHeight: 1.5,
  sectionSpacing: 10,
  headerSize: 18,
  subheaderSize: 16,
  useIconMode: true,
  themeColor: "#000000",
  centerSubtitle: true,
};

export const initialResumeStateVi = {
  title: "Resume mới",
  basic: {
    name: "Nguyễn Văn A",
    title: "Kỹ sư Frontend cao cấp",
    employementStatus: "Đang tìm việc",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    location: "Quận 1, TP. Hồ Chí Minh",
    birthDate: "1995-01",
    fieldOrder: DEFAULT_FIELD_ORDER,
    icons: {
      email: "Mail",
      phone: "Phone",
      birthDate: "CalendarRange",
      employementStatus: "Briefcase",
      location: "MapPin",
    },
    photoConfig: DEFAULT_CONFIG,
    customFields: [
      {
        id: "personal",
        label: "Website cá nhân",
        value: "https://nguyenvana.dev",
        icon: "Globe",
      },
    ],
    photo: "/avatar.png",
    githubKey: "",
    githubUseName: "",
    githubContributionsVisible: false,
  },
  education: [
    {
      id: "1",
      school: "Đại học Bách Khoa TP.HCM",
      major: "Khoa học Máy tính",
      degree: "",
      startDate: "2013-09",
      endDate: "2017-06",
      visible: true,
      gpa: "",
      description: `<ul class="custom-list">
        <li>Môn học chính: Cấu trúc dữ liệu, Thiết kế thuật toán, Hệ điều hành, Mạng máy tính, Công nghệ Web</li>
        <li>Top 5% sinh viên xuất sắc, nhận học bổng loại giỏi trong 3 năm liên tiếp</li>
        <li>Trưởng ban kỹ thuật câu lạc bộ Tin học, tổ chức nhiều buổi chia sẻ kiến thức (workshop)</li>
        <li>Đóng góp cho các dự án mã nguồn mở, đạt chứng chỉ GitHub Campus Expert</li>
      </ul>`,
    },
  ],
  skillContent: `<div class="skill-content">
  <ul class="custom-list">
    <li>Frontend Framework: Thành thạo React, Vue.js. Kinh nghiệm với Next.js, Nuxt.js (SSR)</li>
    <li>Ngôn ngữ: TypeScript, JavaScript (ES6+), HTML5, CSS3</li>
    <li>UI/Styling: TailwindCSS, Sass/Less, CSS Modules, Styled-components</li>
    <li>Quản lý state: Redux, Vuex, Zustand, Jotai, React Query</li>
    <li>Công cụ build: Webpack, Vite, Rollup, Babel, ESLint</li>
    <li>Testing: Jest, React Testing Library, Cypress</li>
    <li>Tối ưu hiệu suất: Hiểu rõ nguyên lý render của trình duyệt, Code splitting, Lazy loading</li>
    <li>Quản lý mã nguồn: Git, SVN</li>
    <li>Kỹ năng quản lý: Có kinh nghiệm dẫn dắt đội ngũ, trực tiếp tham gia lựa chọn công nghệ và thiết kế kiến trúc cho các dự án lớn</li>
  </ul>
</div>`,
  selfEvaluationContent: "",
  experience: [
    {
      id: "1",
      company: "Công ty Công nghệ ABC",
      position: "Kỹ sư Frontend cao cấp",
      date: "2021.07 - Hiện tại",
      visible: true,
      details: `<ul class="custom-list">
      <li>Chịu trách nhiệm phát triển và bảo trì nền tảng Quản trị nội dung, dẫn dắt thiết kế giải pháp kỹ thuật cho các tính năng cốt lõi</li>
      <li>Tối ưu cấu hình build, giảm thời gian build từ 8 phút xuống còn 2 phút, nâng cao hiệu suất làm việc của đội ngũ</li>
      <li>Thiết kế và triển khai thư viện thành phần (component library), tăng tỷ lệ tái sử dụng mã nguồn lên 70%</li>
      <li>Chủ trì dự án tối ưu hiệu suất, giảm 50% thời gian tải trang đầu tiên, tích hợp các hệ thống giám sát hiệu năng</li>
      <li>Hướng dẫn (Mentor) cho các kỹ sư mới, tổ chức các buổi chia sẻ kỹ thuật nội bộ</li>
    </ul>`,
    },
  ],
  draggingProjectId: null,
  projects: [
    {
      id: "p1",
      name: "Nền tảng Phân tích Dữ liệu",
      role: "Trưởng nhóm Frontend",
      date: "2022.06 - 2023.12",
      description: `<ul class="custom-list">
        <li>Sử dụng React xây dựng nền tảng quản lý nội dung và phân tích dữ liệu cho hàng triệu người dùng</li>
        <li>Bao gồm các hệ thống con về phân tích dữ liệu, quản lý nội dung và quản lý doanh thu</li>
        <li>Sử dụng Redux để quản lý state, xử lý hiệu quả các luồng dữ liệu phức tạp</li>
        <li>Sử dụng thư viện thành phần Ant Design để đảm bảo tính nhất quán và trải nghiệm người dùng</li>
        <li>Triển khai chiến lược code splitting và lazy loading để tối ưu hiệu suất tải ứng dụng</li>
      </ul>`,
      visible: true,
    },
  ],
  menuSections: [
    { id: "basic", title: "Thông tin cá nhân", icon: "👤", enabled: true, order: 0 },
    { id: "skills", title: "Kỹ năng", icon: "⚡", enabled: true, order: 1 },
    {
      id: "experience",
      title: "Kinh nghiệm làm việc",
      icon: "💼",
      enabled: true,
      order: 2,
    },
    {
      id: "projects",
      title: "Dự án",
      icon: "🚀",
      enabled: true,
      order: 3,
    },
    {
      id: "education",
      title: "Học vấn",
      icon: "🎓",
      enabled: true,
      order: 4,
    },
  ],
  certificates: [],
  customData: {},
  activeSection: "basic",
  globalSettings: initialGlobalSettings,
};

export const initialResumeStateEn = {
  title: "New Resume",
  basic: {
    name: "John Doe",
    title: "Senior Frontend Engineer",
    employementStatus: "Open to work",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    location: "San Francisco, CA",
    birthDate: "1995-01",
    fieldOrder: DEFAULT_FIELD_ORDER,
    icons: {
      email: "Mail",
      phone: "Phone",
      birthDate: "CalendarRange",
      employementStatus: "Briefcase",
      location: "MapPin",
    },
    photoConfig: DEFAULT_CONFIG,
    customFields: [
      {
        id: "personal",
        label: "Personal Website",
        value: "https://johndoe.dev",
        icon: "Globe",
      },
    ],
    photo: "/avatar.png",
    githubKey: "",
    githubUseName: "",
    githubContributionsVisible: false,
  },
  education: [
    {
      id: "1",
      school: "Stanford University",
      major: "Computer Science",
      degree: "Bachelor's Degree",
      startDate: "2013-09",
      endDate: "2017-06",
      visible: true,
      gpa: "3.8/4.0",
      description: `<ul class="custom-list">
        <li>Core courses: Data Structures, Algorithms, Operating Systems, Computer Networks, Web Technologies</li>
        <li>Top 5% of class, Received excellence scholarship for 3 consecutive years</li>
        <li>Head of technical club, organized multiple knowledge sharing workshops</li>
        <li>Contributed to open source projects, certified GitHub Campus Expert</li>
      </ul>`,
    },
  ],
  skillContent: `<div class="skill-content">
  <ul class="custom-list">
    <li>Frontend Frameworks: Proficient in React, Vue.js. Experience with Next.js, Nuxt.js (SSR)</li>
    <li>Languages: TypeScript, JavaScript (ES6+), HTML5, CSS3</li>
    <li>UI/Styling: TailwindCSS, Sass/Less, CSS Modules, Styled-components</li>
    <li>State Management: Redux, Vuex, Zustand, Jotai, React Query</li>
    <li>Build Tools: Webpack, Vite, Rollup, Babel, ESLint</li>
    <li>Testing: Jest, React Testing Library, Cypress</li>
    <li>Performance Optimization: In-depth understanding of browser rendering, Code splitting, Lazy loading</li>
    <li>Source Control: Git, SVN</li>
    <li>Management: Experience leading teams, directly involved in tech stack selection and architecture design for large projects</li>
  </ul>
</div>`,
  selfEvaluationContent: "",
  experience: [
    {
      id: "1",
      company: "ABC Tech Corp",
      position: "Senior Frontend Engineer",
      date: "2021.07 - Present",
      visible: true,
      details: `<ul class="custom-list">
      <li>Responsible for developing and maintaining the CMS platform, leading technical solutions for core features</li>
      <li>Optimized build configurations, reducing build time from 8 mins to 2 mins, improving team productivity</li>
      <li>Designed and implemented a component library, increasing code reusability to 70%</li>
      <li>Led performance optimization projects, reducing first-page load time by 50%</li>
      <li>Mentored new engineers, organized internal technical sharing sessions</li>
    </ul>`,
    },
  ],
  draggingProjectId: null,
  projects: [
    {
      id: "p1",
      name: "Data Analytics Platform",
      role: "Frontend Lead",
      date: "2022.06 - 2023.12",
      description: `<ul class="custom-list">
        <li>Built a CMS and data analytics platform for millions of users using React</li>
        <li>Includes sub-systems for data analysis, content management, and revenue tracking</li>
        <li>Used Redux for state management, efficiently handling complex data flows</li>
        <li>Implemented Ant Design component library to ensure consistency and UX</li>
        <li>Deployed code splitting and lazy loading strategies to optimize application performance</li>
      </ul>`,
      visible: true,
    },
  ],
  menuSections: [
    { id: "basic", title: "Personal Info", icon: "👤", enabled: true, order: 0 },
    { id: "skills", title: "Skills", icon: "⚡", enabled: true, order: 1 },
    {
      id: "experience",
      title: "Work Experience",
      icon: "💼",
      enabled: true,
      order: 2,
    },
    {
      id: "projects",
      title: "Projects",
      icon: "🚀",
      enabled: true,
      order: 3,
    },
    {
      id: "education",
      title: "Education",
      icon: "🎓",
      enabled: true,
      order: 4,
    },
  ],
  certificates: [],
  customData: {},
  activeSection: "basic",
  globalSettings: initialGlobalSettings,
};

export const blankResumeStateVi = {
  ...initialResumeStateVi,
  title: "Resume mới",
  basic: {
    ...initialResumeStateVi.basic,
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    birthDate: "",
    employementStatus: "",
    photo: "",
    customFields: [],
  },
  education: [],
  skillContent: "",
  selfEvaluationContent: "",
  experience: [],
  projects: [],
  certificates: [],
  menuSections: [initialResumeStateVi.menuSections[0]],
};

export const blankResumeStateEn = {
  ...initialResumeStateEn,
  title: "New Resume",
  basic: {
    ...initialResumeStateEn.basic,
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    birthDate: "",
    employementStatus: "",
    photo: "",
    customFields: [],
  },
  education: [],
  skillContent: "",
  selfEvaluationContent: "",
  experience: [],
  projects: [],
  certificates: [],
  menuSections: [initialResumeStateEn.menuSections[0]],
};
