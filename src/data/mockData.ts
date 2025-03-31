
// Mock data for categories with tree structure
export const categories = [
  {
    id: "cat1",
    parentId: null,
    key: "cat1",
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-01-15T10:00:00Z",
    status: "active",
    languages: [
      {
        languageId: "en",
        name: "Web Development",
        description: "All about web development technologies",
      },
      {
        languageId: "vi",
        name: "Phát triển Web",
        description: "Tất cả về công nghệ phát triển web",
      }
    ],
    imageId: "img1",
    children: [
      {
        id: "cat2",
        parentId: "cat1",
        key: "cat1-cat2",
        createdAt: "2023-01-16T11:00:00Z",
        updatedAt: "2023-01-16T11:00:00Z",
        status: "active",
        languages: [
          {
            languageId: "en",
            name: "Frontend Development",
            description: "Everything about frontend technologies",
          },
          {
            languageId: "vi",
            name: "Phát triển Frontend",
            description: "Tất cả về công nghệ frontend",
          }
        ],
        imageId: "img2",
        children: [
          {
            id: "cat5",
            parentId: "cat2",
            key: "cat1-cat2-cat5",
            createdAt: "2023-01-18T13:00:00Z",
            updatedAt: "2023-01-18T13:00:00Z",
            status: "active",
            languages: [
              {
                languageId: "en",
                name: "React",
                description: "React framework and ecosystem",
              },
              {
                languageId: "vi",
                name: "React",
                description: "Framework React và hệ sinh thái",
              }
            ],
            imageId: "img5",
            children: []
          },
          {
            id: "cat6",
            parentId: "cat2",
            key: "cat1-cat2-cat6",
            createdAt: "2023-01-19T14:00:00Z",
            updatedAt: "2023-01-19T14:00:00Z",
            status: "active",
            languages: [
              {
                languageId: "en",
                name: "Vue",
                description: "Vue.js framework and ecosystem",
              },
              {
                languageId: "vi",
                name: "Vue",
                description: "Framework Vue.js và hệ sinh thái",
              }
            ],
            imageId: "img6",
            children: []
          }
        ]
      },
      {
        id: "cat3",
        parentId: "cat1",
        key: "cat1-cat3",
        createdAt: "2023-01-17T12:00:00Z",
        updatedAt: "2023-01-17T12:00:00Z",
        status: "active",
        languages: [
          {
            languageId: "en",
            name: "Backend Development",
            description: "Server-side programming and databases",
          },
          {
            languageId: "vi",
            name: "Phát triển Backend",
            description: "Lập trình phía máy chủ và cơ sở dữ liệu",
          }
        ],
        imageId: "img3",
        children: [
          {
            id: "cat7",
            parentId: "cat3",
            key: "cat1-cat3-cat7",
            createdAt: "2023-01-20T15:00:00Z",
            updatedAt: "2023-01-20T15:00:00Z",
            status: "active",
            languages: [
              {
                languageId: "en",
                name: "Node.js",
                description: "Node.js runtime and frameworks",
              },
              {
                languageId: "vi",
                name: "Node.js",
                description: "Môi trường Node.js và các framework",
              }
            ],
            imageId: "img7",
            children: []
          },
          {
            id: "cat8",
            parentId: "cat3",
            key: "cat1-cat3-cat8",
            createdAt: "2023-01-21T16:00:00Z",
            updatedAt: "2023-01-21T16:00:00Z",
            status: "active",
            languages: [
              {
                languageId: "en",
                name: "Databases",
                description: "SQL and NoSQL database systems",
              },
              {
                languageId: "vi",
                name: "Cơ sở dữ liệu",
                description: "Hệ thống cơ sở dữ liệu SQL và NoSQL",
              }
            ],
            imageId: "img8",
            children: []
          }
        ]
      }
    ]
  },
  {
    id: "cat4",
    parentId: null,
    key: "cat4",
    createdAt: "2023-01-17T12:30:00Z",
    updatedAt: "2023-01-17T12:30:00Z",
    status: "active",
    languages: [
      {
        languageId: "en",
        name: "Mobile Development",
        description: "Creating applications for mobile devices",
      },
      {
        languageId: "vi",
        name: "Phát triển Di động",
        description: "Tạo ứng dụng cho thiết bị di động",
      }
    ],
    imageId: "img4",
    children: [
      {
        id: "cat9",
        parentId: "cat4",
        key: "cat4-cat9",
        createdAt: "2023-01-22T17:00:00Z",
        updatedAt: "2023-01-22T17:00:00Z",
        status: "active",
        languages: [
          {
            languageId: "en",
            name: "React Native",
            description: "Cross-platform mobile development with React",
          },
          {
            languageId: "vi",
            name: "React Native",
            description: "Phát triển di động đa nền tảng với React",
          }
        ],
        imageId: "img9",
        children: []
      },
      {
        id: "cat10",
        parentId: "cat4",
        key: "cat4-cat10",
        createdAt: "2023-01-23T18:00:00Z",
        updatedAt: "2023-01-23T18:00:00Z",
        status: "active",
        languages: [
          {
            languageId: "en",
            name: "Flutter",
            description: "Google's UI toolkit for mobile development",
          },
          {
            languageId: "vi",
            name: "Flutter",
            description: "Bộ công cụ UI của Google cho phát triển di động",
          }
        ],
        imageId: "img10",
        children: []
      }
    ]
  }
];

// Mock data for images
export const images = [
  {
    id: "img1",
    filename: "web_development.jpg",
    path: "https://via.placeholder.com/800x400?text=Web+Development",
    mimeType: "image/jpeg",
    size: 1024000,
    createdAt: "2023-01-10T09:00:00Z",
    updatedAt: "2023-01-10T09:00:00Z"
  },
  {
    id: "img2",
    filename: "frontend.jpg",
    path: "https://via.placeholder.com/800x400?text=Frontend+Development",
    mimeType: "image/jpeg",
    size: 925000,
    createdAt: "2023-01-11T09:05:00Z",
    updatedAt: "2023-01-11T09:05:00Z"
  },
  {
    id: "img3",
    filename: "backend.jpg",
    path: "https://via.placeholder.com/800x400?text=Backend+Development",
    mimeType: "image/jpeg",
    size: 876000,
    createdAt: "2023-01-12T09:10:00Z",
    updatedAt: "2023-01-12T09:10:00Z"
  },
  {
    id: "img4",
    filename: "mobile.jpg",
    path: "https://via.placeholder.com/800x400?text=Mobile+Development",
    mimeType: "image/jpeg",
    size: 950000,
    createdAt: "2023-01-13T09:15:00Z",
    updatedAt: "2023-01-13T09:15:00Z"
  },
  {
    id: "img5",
    filename: "react.jpg",
    path: "https://via.placeholder.com/800x400?text=React",
    mimeType: "image/jpeg",
    size: 820000,
    createdAt: "2023-01-14T09:20:00Z",
    updatedAt: "2023-01-14T09:20:00Z"
  },
  {
    id: "img6",
    filename: "vue.jpg",
    path: "https://via.placeholder.com/800x400?text=Vue",
    mimeType: "image/jpeg",
    size: 790000,
    createdAt: "2023-01-15T09:25:00Z",
    updatedAt: "2023-01-15T09:25:00Z"
  },
  {
    id: "img7",
    filename: "nodejs.jpg",
    path: "https://via.placeholder.com/800x400?text=Node.js",
    mimeType: "image/jpeg",
    size: 810000,
    createdAt: "2023-01-16T09:30:00Z",
    updatedAt: "2023-01-16T09:30:00Z"
  },
  {
    id: "img8",
    filename: "databases.jpg",
    path: "https://via.placeholder.com/800x400?text=Databases",
    mimeType: "image/jpeg",
    size: 760000,
    createdAt: "2023-01-17T09:35:00Z",
    updatedAt: "2023-01-17T09:35:00Z"
  },
  {
    id: "img9",
    filename: "react_native.jpg",
    path: "https://via.placeholder.com/800x400?text=React+Native",
    mimeType: "image/jpeg",
    size: 840000,
    createdAt: "2023-01-18T09:40:00Z",
    updatedAt: "2023-01-18T09:40:00Z"
  },
  {
    id: "img10",
    filename: "flutter.jpg",
    path: "https://via.placeholder.com/800x400?text=Flutter",
    mimeType: "image/jpeg",
    size: 830000,
    createdAt: "2023-01-19T09:45:00Z",
    updatedAt: "2023-01-19T09:45:00Z"
  },
  {
    id: "img11",
    filename: "react_hooks.jpg",
    path: "https://via.placeholder.com/800x400?text=React+Hooks",
    mimeType: "image/jpeg",
    size: 805000,
    createdAt: "2023-01-20T09:50:00Z",
    updatedAt: "2023-01-20T09:50:00Z"
  },
  {
    id: "img12",
    filename: "typescript.jpg",
    path: "https://via.placeholder.com/800x400?text=TypeScript",
    mimeType: "image/jpeg",
    size: 795000,
    createdAt: "2023-01-21T09:55:00Z",
    updatedAt: "2023-01-21T09:55:00Z"
  }
];

// Mock data for content
export const contents = [
  {
    id: "cont1",
    categoryId: "cat5", // React category
    imageId: "img5", // React image
    status: "published",
    createdAt: "2023-02-01T10:00:00Z",
    updatedAt: "2023-02-01T10:00:00Z",
    languages: [
      {
        languageId: "en",
        title: "Introduction to React Hooks",
        description: "Learn how React Hooks can simplify your components"
      },
      {
        languageId: "vi",
        title: "Giới thiệu về React Hooks",
        description: "Tìm hiểu cách React Hooks có thể đơn giản hóa các component của bạn"
      }
    ]
  },
  {
    id: "cont2",
    categoryId: "cat5", // React category
    imageId: "img5", // React image
    status: "published",
    createdAt: "2023-02-02T11:00:00Z",
    updatedAt: "2023-02-02T11:00:00Z",
    languages: [
      {
        languageId: "en",
        title: "Advanced React Patterns",
        description: "Deep dive into advanced React design patterns"
      },
      {
        languageId: "vi",
        title: "Mẫu React Nâng cao",
        description: "Đi sâu vào các mẫu thiết kế React nâng cao"
      }
    ]
  },
  {
    id: "cont3",
    categoryId: "cat6", // Vue category
    imageId: "img6", // Vue image
    status: "published",
    createdAt: "2023-02-03T12:00:00Z",
    updatedAt: "2023-02-03T12:00:00Z",
    languages: [
      {
        languageId: "en",
        title: "Vue.js 3 Composition API",
        description: "Exploring the new Composition API in Vue 3"
      },
      {
        languageId: "vi",
        title: "Vue.js 3 Composition API",
        description: "Khám phá Composition API mới trong Vue 3"
      }
    ]
  },
  {
    id: "cont4",
    categoryId: "cat7", // Node.js category
    imageId: "img7", // Node.js image
    status: "published",
    createdAt: "2023-02-04T13:00:00Z",
    updatedAt: "2023-02-04T13:00:00Z",
    languages: [
      {
        languageId: "en",
        title: "Building RESTful APIs with Express",
        description: "Learn how to create robust REST APIs using Express.js"
      },
      {
        languageId: "vi",
        title: "Xây dựng RESTful API với Express",
        description: "Học cách tạo API REST mạnh mẽ bằng Express.js"
      }
    ]
  },
  {
    id: "cont5",
    categoryId: "cat8", // Databases category
    imageId: "img8", // Databases image
    status: "published",
    createdAt: "2023-02-05T14:00:00Z",
    updatedAt: "2023-02-05T14:00:00Z",
    languages: [
      {
        languageId: "en",
        title: "MongoDB Aggregation Framework",
        description: "Master the powerful aggregation pipeline in MongoDB"
      },
      {
        languageId: "vi",
        title: "MongoDB Aggregation Framework",
        description: "Làm chủ pipeline tổng hợp mạnh mẽ trong MongoDB"
      }
    ]
  },
  {
    id: "cont6",
    categoryId: "cat9", // React Native category
    imageId: "img9", // React Native image
    status: "published",
    createdAt: "2023-02-06T15:00:00Z",
    updatedAt: "2023-02-06T15:00:00Z",
    languages: [
      {
        languageId: "en",
        title: "Navigation in React Native",
        description: "Deep dive into React Navigation for cross-platform apps"
      },
      {
        languageId: "vi",
        title: "Điều hướng trong React Native",
        description: "Đi sâu vào React Navigation cho ứng dụng đa nền tảng"
      }
    ]
  },
  {
    id: "cont7",
    categoryId: "cat10", // Flutter category
    imageId: "img10", // Flutter image
    status: "published",
    createdAt: "2023-02-07T16:00:00Z",
    updatedAt: "2023-02-07T16:00:00Z",
    languages: [
      {
        languageId: "en",
        title: "State Management in Flutter",
        description: "Comparing different state management solutions in Flutter"
      },
      {
        languageId: "vi",
        title: "Quản lý trạng thái trong Flutter",
        description: "So sánh các giải pháp quản lý trạng thái khác nhau trong Flutter"
      }
    ]
  },
  {
    id: "cont8",
    categoryId: "cat5", // React category
    imageId: "img11", // React Hooks image
    status: "published",
    createdAt: "2023-02-08T17:00:00Z",
    updatedAt: "2023-02-08T17:00:00Z",
    languages: [
      {
        languageId: "en",
        title: "Custom React Hooks",
        description: "Creating reusable logic with custom React hooks"
      },
      {
        languageId: "vi",
        title: "Custom React Hooks",
        description: "Tạo logic có thể tái sử dụng với custom hook trong React"
      }
    ]
  },
  {
    id: "cont9",
    categoryId: "cat2", // Frontend category
    imageId: "img12", // TypeScript image
    status: "published",
    createdAt: "2023-02-09T18:00:00Z",
    updatedAt: "2023-02-09T18:00:00Z",
    languages: [
      {
        languageId: "en",
        title: "TypeScript for React Developers",
        description: "How to leverage TypeScript in your React applications"
      },
      {
        languageId: "vi",
        title: "TypeScript cho React Developer",
        description: "Cách tận dụng TypeScript trong ứng dụng React của bạn"
      }
    ]
  },
  {
    id: "cont10",
    categoryId: "cat3", // Backend category
    imageId: "img3", // Backend image
    status: "published",
    createdAt: "2023-02-10T19:00:00Z",
    updatedAt: "2023-02-10T19:00:00Z",
    languages: [
      {
        languageId: "en",
        title: "API Security Best Practices",
        description: "Protecting your backend APIs from common security threats"
      },
      {
        languageId: "vi",
        title: "Thực hành bảo mật API tốt nhất",
        description: "Bảo vệ API backend của bạn khỏi các mối đe dọa bảo mật phổ biến"
      }
    ]
  }
];

// Mock data for content details
export const contentDetails = [
  {
    id: "cd1",
    contentId: "cont1",
    orderIndex: 1,
    imageId: "img11",
    createdAt: "2023-02-01T10:30:00Z",
    updatedAt: "2023-02-01T10:30:00Z",
    languages: [
      {
        languageId: "en",
        title: "What are React Hooks?",
        content: `
<p>React Hooks are functions that let you "hook into" React state and lifecycle features from functional components. Hooks don't work inside classes — they let you use React without classes.</p>

<p>The most commonly used hooks are:</p>
<ul>
  <li><strong>useState</strong> - Allows you to add state to functional components</li>
  <li><strong>useEffect</strong> - Allows you to perform side effects in functional components</li>
  <li><strong>useContext</strong> - Accepts a context object and returns the current context value</li>
  <li><strong>useReducer</strong> - An alternative to useState for complex state logic</li>
</ul>

<p>Hooks solve many problems in React, including the wrapper hell of components, huge components, and confusing classes.</p>
        `
      },
      {
        languageId: "vi",
        title: "React Hooks là gì?",
        content: `
<p>React Hooks là các hàm cho phép bạn "hook vào" các tính năng state và lifecycle của React từ các component chức năng. Hooks không hoạt động bên trong các lớp - chúng cho phép bạn sử dụng React mà không cần lớp.</p>

<p>Các hooks được sử dụng phổ biến nhất là:</p>
<ul>
  <li><strong>useState</strong> - Cho phép bạn thêm state vào các component chức năng</li>
  <li><strong>useEffect</strong> - Cho phép bạn thực hiện các side effect trong các component chức năng</li>
  <li><strong>useContext</strong> - Chấp nhận một đối tượng context và trả về giá trị context hiện tại</li>
  <li><strong>useReducer</strong> - Một giải pháp thay thế cho useState đối với logic state phức tạp</li>
</ul>

<p>Hooks giải quyết nhiều vấn đề trong React, bao gồm wrapper hell của components, components lớn và classes gây nhầm lẫn.</p>
        `
      }
    ]
  },
  {
    id: "cd2",
    contentId: "cont1",
    orderIndex: 2,
    imageId: "img5",
    createdAt: "2023-02-01T11:00:00Z",
    updatedAt: "2023-02-01T11:00:00Z",
    languages: [
      {
        languageId: "en",
        title: "useState Hook Example",
        content: `
<p>The useState hook allows you to add state to functional components. Here's a simple counter example:</p>

<pre><code>
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
</code></pre>

<p>In this example, useState returns a pair: the current state value (count) and a function that lets you update it (setCount).</p>
        `
      },
      {
        languageId: "vi",
        title: "Ví dụ về useState Hook",
        content: `
<p>Hook useState cho phép bạn thêm state vào các component chức năng. Đây là một ví dụ đơn giản về bộ đếm:</p>

<pre><code>
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Bạn đã nhấp {count} lần</p>
      <button onClick={() => setCount(count + 1)}>
        Nhấp tôi
      </button>
    </div>
  );
}
</code></pre>

<p>Trong ví dụ này, useState trả về một cặp: giá trị state hiện tại (count) và một hàm cho phép bạn cập nhật nó (setCount).</p>
        `
      }
    ]
  },
  {
    id: "cd3",
    contentId: "cont2",
    orderIndex: 1,
    imageId: "img5",
    createdAt: "2023-02-02T11:30:00Z",
    updatedAt: "2023-02-02T11:30:00Z",
    languages: [
      {
        languageId: "en",
        title: "Compound Components Pattern",
        content: `
<p>The Compound Components pattern is a pattern where components are used together such that they share an implicit state that lets them communicate with each other in the background.</p>

<pre><code>
import React, { createContext, useState, useContext } from 'react';

// Create a context
const TabContext = createContext();

// Parent component
const Tabs = ({ children, defaultIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  
  return (
    <TabContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className="tabs">{children}</div>
    </TabContext.Provider>
  );
};

// Child components
const TabList = ({ children }) => {
  return <div className="tab-list">{children}</div>;
};

const Tab = ({ children, index }) => {
  const { activeIndex, setActiveIndex } = useContext(TabContext);
  
  return (
    <div
      className={\`tab \${activeIndex === index ? 'active' : ''}\`}
      onClick={() => setActiveIndex(index)}
    >
      {children}
    </div>
  );
};

const TabPanels = ({ children }) => {
  const { activeIndex } = useContext(TabContext);
  
  return <div className="tab-panels">{children[activeIndex]}</div>;
};

const TabPanel = ({ children }) => {
  return <div className="tab-panel">{children}</div>;
};

// Usage
function App() {
  return (
    <Tabs>
      <TabList>
        <Tab index={0}>Tab 1</Tab>
        <Tab index={1}>Tab 2</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Content for Tab 1</TabPanel>
        <TabPanel>Content for Tab 2</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
</code></pre>

<p>This pattern is powerful because it allows for highly customizable and reusable component systems.</p>
        `
      },
      {
        languageId: "vi",
        title: "Mẫu Compound Components",
        content: `
<p>Mẫu Compound Components là một mẫu trong đó các components được sử dụng cùng nhau sao cho chúng chia sẻ một state ngầm cho phép chúng giao tiếp với nhau trong nền.</p>

<pre><code>
import React, { createContext, useState, useContext } from 'react';

// Tạo context
const TabContext = createContext();

// Component cha
const Tabs = ({ children, defaultIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  
  return (
    <TabContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className="tabs">{children}</div>
    </TabContext.Provider>
  );
};

// Các component con
const TabList = ({ children }) => {
  return <div className="tab-list">{children}</div>;
};

const Tab = ({ children, index }) => {
  const { activeIndex, setActiveIndex } = useContext(TabContext);
  
  return (
    <div
      className={\`tab \${activeIndex === index ? 'active' : ''}\`}
      onClick={() => setActiveIndex(index)}
    >
      {children}
    </div>
  );
};

const TabPanels = ({ children }) => {
  const { activeIndex } = useContext(TabContext);
  
  return <div className="tab-panels">{children[activeIndex]}</div>;
};

const TabPanel = ({ children }) => {
  return <div className="tab-panel">{children}</div>;
};

// Sử dụng
function App() {
  return (
    <Tabs>
      <TabList>
        <Tab index={0}>Tab 1</Tab>
        <Tab index={1}>Tab 2</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Nội dung cho Tab 1</TabPanel>
        <TabPanel>Nội dung cho Tab 2</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
</code></pre>

<p>Mẫu này rất mạnh mẽ vì nó cho phép các hệ thống component có thể tùy chỉnh cao và có thể tái sử dụng.</p>
        `
      }
    ]
  },
  {
    id: "cd4",
    contentId: "cont3",
    orderIndex: 1,
    imageId: "img6",
    createdAt: "2023-02-03T12:30:00Z",
    updatedAt: "2023-02-03T12:30:00Z",
    languages: [
      {
        languageId: "en",
        title: "Understanding the Composition API",
        content: `
<p>The Composition API is a set of APIs that allows us to author Vue components using imported functions instead of declaring options. It is an alternative to the Options API and gives us these key advantages:</p>

<ul>
  <li>Better logic reuse and code organization</li>
  <li>More flexible composition of component logic</li>
  <li>Better type inference</li>
  <li>Smaller bundle size through tree-shaking</li>
</ul>

<p>Here's a simple example of a counter component using the Composition API:</p>

<pre><code>
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    
    function increment() {
      count.value++
    }
    
    return {
      count,
      increment
    }
  }
}
</script>
</code></pre>

<p>In this example, we use the ref function to create a reactive reference to the count value, and then we expose both the count and the increment function to the template.</p>
        `
      },
      {
        languageId: "vi",
        title: "Hiểu về Composition API",
        content: `
<p>Composition API là một tập hợp các API cho phép chúng ta tạo các component Vue bằng cách sử dụng các hàm nhập vào thay vì khai báo các tùy chọn. Đây là một giải pháp thay thế cho Options API và mang lại cho chúng ta những lợi thế chính sau:</p>

<ul>
  <li>Tái sử dụng logic và tổ chức mã tốt hơn</li>
  <li>Linh hoạt hơn trong việc kết hợp logic component</li>
  <li>Suy luận kiểu dữ liệu tốt hơn</li>
  <li>Kích thước bundle nhỏ hơn thông qua tree-shaking</li>
</ul>

<p>Đây là một ví dụ đơn giản về component bộ đếm sử dụng Composition API:</p>

<pre><code>
<template>
  <div>
    <p>Số lượng: {{ count }}</p>
    <button @click="increment">Tăng</button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    
    function increment() {
      count.value++
    }
    
    return {
      count,
      increment
    }
  }
}
</script>
</code></pre>

<p>Trong ví dụ này, chúng ta sử dụng hàm ref để tạo một tham chiếu phản ứng đến giá trị count, và sau đó chúng ta hiển thị cả count và hàm increment cho template.</p>
        `
      }
    ]
  }
];

// Mock data for content-image relationships
export const contentImages = [
  { contentId: "cont1", imageId: "img5" },
  { contentId: "cont1", imageId: "img11" },
  { contentId: "cont2", imageId: "img5" },
  { contentId: "cont3", imageId: "img6" },
  { contentId: "cont4", imageId: "img7" },
  { contentId: "cont5", imageId: "img8" },
  { contentId: "cont6", imageId: "img9" },
  { contentId: "cont7", imageId: "img10" },
  { contentId: "cont8", imageId: "img11" },
  { contentId: "cont9", imageId: "img12" },
  { contentId: "cont10", imageId: "img3" }
];

// Mock data for pages
export const pages = [
  {
    id: "page1",
    title: "Home Page",
    slug: "home",
    status: "published",
    createdAt: "2023-03-01T10:00:00Z",
    updatedAt: "2023-03-01T10:00:00Z",
    components: [
      {
        id: "comp1",
        type: "hero",
        orderIndex: 1,
        settings: {
          backgroundColor: "#f5f5f5",
          textColor: "#333333",
          contentAlignment: "center"
        },
        content: {
          mainContentId: "cont1",
          featuredContentIds: ["cont2", "cont3", "cont8", "cont9"]
        }
      },
      {
        id: "comp2",
        type: "featured-grid",
        orderIndex: 2,
        settings: {
          backgroundColor: "#ffffff",
          columns: 2,
          showImages: true
        },
        content: {
          title: "Popular Articles",
          mainContentId: "cont10",
          featuredContentIds: ["cont4", "cont5", "cont6", "cont7"]
        }
      }
    ]
  },
  {
    id: "page2",
    title: "React Resources",
    slug: "react-resources",
    status: "published",
    createdAt: "2023-03-02T11:00:00Z",
    updatedAt: "2023-03-02T11:00:00Z",
    components: [
      {
        id: "comp3",
        type: "header",
        orderIndex: 1,
        settings: {
          backgroundColor: "#282c34",
          textColor: "#ffffff",
          height: "medium"
        },
        content: {
          title: "React Development Resources",
          subtitle: "Everything you need to master React"
        }
      },
      {
        id: "comp4",
        type: "content-list",
        orderIndex: 2,
        settings: {
          backgroundColor: "#ffffff",
          layout: "list",
          showImages: true
        },
        content: {
          title: "React Articles",
          contentIds: ["cont1", "cont2", "cont8", "cont9"]
        }
      }
    ]
  },
  {
    id: "page3",
    title: "Backend Development",
    slug: "backend-development",
    status: "published",
    createdAt: "2023-03-03T12:00:00Z",
    updatedAt: "2023-03-03T12:00:00Z",
    components: [
      {
        id: "comp5",
        type: "header",
        orderIndex: 1,
        settings: {
          backgroundColor: "#1a365d",
          textColor: "#ffffff",
          height: "large"
        },
        content: {
          title: "Backend Development Resources",
          subtitle: "Server-side programming and database management"
        }
      },
      {
        id: "comp6",
        type: "content-grid",
        orderIndex: 2,
        settings: {
          backgroundColor: "#f7fafc",
          columns: 3,
          showImages: true
        },
        content: {
          title: "Popular Backend Articles",
          contentIds: ["cont4", "cont5", "cont10"]
        }
      }
    ]
  }
];

// Mock available component types for pages
export const componentTypes = [
  {
    type: "hero",
    name: "Hero Banner",
    description: "Large banner with primary content and optional featured items",
    allowsMainContent: true,
    allowsFeaturedContent: true,
    maxFeaturedItems: 4,
    settingsSchema: {
      backgroundColor: "color",
      textColor: "color",
      contentAlignment: ["left", "center", "right"]
    },
    preview: "https://via.placeholder.com/400x200?text=Hero+Component"
  },
  {
    type: "header",
    name: "Page Header",
    description: "Header section with title and subtitle",
    allowsMainContent: false,
    allowsFeaturedContent: false,
    settingsSchema: {
      backgroundColor: "color",
      textColor: "color",
      height: ["small", "medium", "large"]
    },
    preview: "https://via.placeholder.com/400x100?text=Header+Component"
  },
  {
    type: "content-list",
    name: "Content List",
    description: "Displays a list of content items",
    allowsMainContent: false,
    allowsFeaturedContent: false,
    settingsSchema: {
      backgroundColor: "color",
      layout: ["list", "compact", "detailed"],
      showImages: "boolean"
    },
    preview: "https://via.placeholder.com/400x300?text=Content+List"
  },
  {
    type: "content-grid",
    name: "Content Grid",
    description: "Displays content items in a grid layout",
    allowsMainContent: false,
    allowsFeaturedContent: false,
    settingsSchema: {
      backgroundColor: "color",
      columns: [2, 3, 4],
      showImages: "boolean"
    },
    preview: "https://via.placeholder.com/400x300?text=Content+Grid"
  },
  {
    type: "featured-grid",
    name: "Featured Content Grid",
    description: "Grid with one main content and several featured items",
    allowsMainContent: true,
    allowsFeaturedContent: true,
    maxFeaturedItems: 4,
    settingsSchema: {
      backgroundColor: "color",
      columns: [2, 3, 4],
      showImages: "boolean"
    },
    preview: "https://via.placeholder.com/400x300?text=Featured+Grid"
  }
];
