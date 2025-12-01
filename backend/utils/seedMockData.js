const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Post = require('../models/Post');
const User = require('../models/User');
const connectDB = require('../config/db');

dotenv.config();

const mockPosts = [
    {
        title: "Getting Started with React Hooks: A Comprehensive Guide",
        content: `<h2>Introduction to React Hooks</h2>
<p>React Hooks revolutionized the way we write React components. In this comprehensive guide, we'll explore the most commonly used hooks and how they can simplify your code.</p>

<h3>What are Hooks?</h3>
<p>Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8 and have become the standard way to write React components.</p>

<h3>The useState Hook</h3>
<p>The <code>useState</code> hook is the most fundamental hook. Here's a simple example:</p>

<pre><code>const [count, setCount] = useState(0);

function increment() {
  setCount(count + 1);
}</code></pre>

<h3>The useEffect Hook</h3>
<p>useEffect lets you perform side effects in function components. It's similar to componentDidMount, componentDidUpdate, and componentWillUnmount combined.</p>

<p>Key takeaways:</p>
<ul>
<li>Hooks make code more readable and reusable</li>
<li>They eliminate the need for class components in most cases</li>
<li>Custom hooks allow you to extract component logic</li>
</ul>`,
        tips: "Always include dependencies in your useEffect array to avoid stale closures. Use the React DevTools to debug hook state.",
        learnings: "Understanding hooks deeply will make you a more effective React developer. Start with useState and useEffect, then explore custom hooks.",
        tags: ["React", "JavaScript", "Web Development", "Hooks", "Frontend"],
        isDraft: false
    },
    {
        title: "Building RESTful APIs with Node.js and Express",
        content: `<h2>Creating a Production-Ready REST API</h2>
<p>Building robust APIs is essential for modern web applications. Let's walk through creating a professional REST API with Node.js and Express.</p>

<h3>Setting Up Your Project</h3>
<p>First, initialize your project and install dependencies:</p>

<pre><code>npm init -y
npm install express mongoose dotenv cors</code></pre>

<h3>Project Structure</h3>
<p>A well-organized project structure is crucial:</p>
<ul>
<li><strong>routes/</strong> - API route definitions</li>
<li><strong>controllers/</strong> - Business logic</li>
<li><strong>models/</strong> - Database schemas</li>
<li><strong>middleware/</strong> - Custom middleware functions</li>
</ul>

<h3>Best Practices</h3>
<p>Here are some essential best practices:</p>
<ol>
<li>Use environment variables for sensitive data</li>
<li>Implement proper error handling</li>
<li>Add request validation</li>
<li>Use async/await for cleaner code</li>
<li>Implement rate limiting</li>
</ol>

<p>Remember: Security should be your top priority when building APIs!</p>`,
        tips: "Use middleware like helmet.js for security headers and express-validator for input validation.",
        learnings: "Understanding REST principles and HTTP status codes is fundamental to API development.",
        codeSnippet: `const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});`,
        tags: ["Node.js", "Express", "API", "Backend", "REST"],
        isDraft: false
    },
    {
        title: "My Journey from Beginner to Full-Stack Developer",
        content: `<h2>The Path to Becoming a Full-Stack Developer</h2>
<p>Two years ago, I wrote my first line of code. Today, I'm working as a full-stack developer at a tech startup. Here's my story and what I learned along the way.</p>

<h3>The Beginning</h3>
<p>I started with HTML and CSS, building simple static websites. It was frustrating at first, but seeing my designs come to life was incredibly rewarding.</p>

<h3>Learning JavaScript</h3>
<p>JavaScript was a game-changer. Suddenly, my websites could be interactive! I spent months on freeCodeCamp and built countless todo apps (yes, really).</p>

<h3>Key Milestones</h3>
<ul>
<li><strong>Month 3:</strong> Built my first interactive website</li>
<li><strong>Month 6:</strong> Learned React and created my portfolio</li>
<li><strong>Month 9:</strong> Started learning backend with Node.js</li>
<li><strong>Month 12:</strong> Built my first full-stack application</li>
<li><strong>Month 18:</strong> Got my first developer job!</li>
</ul>

<h3>Advice for Beginners</h3>
<p>If you're just starting out:</p>
<ol>
<li>Don't try to learn everything at once</li>
<li>Build projects, not just tutorials</li>
<li>Join developer communities</li>
<li>Don't compare your progress to others</li>
<li>Consistency beats intensity</li>
</ol>

<p>The journey is challenging but absolutely worth it. Keep coding! 💪</p>`,
        learnings: "The most important skill is learning how to learn. Technologies change, but problem-solving skills are timeless.",
        tags: ["Career", "Learning", "Motivation", "Personal Story"],
        isDraft: false
    },
    {
        title: "Understanding MongoDB Aggregation Pipeline",
        content: `<h2>Mastering MongoDB Aggregations</h2>
<p>The aggregation pipeline is one of MongoDB's most powerful features. Let's explore how to use it effectively.</p>

<h3>What is Aggregation?</h3>
<p>Aggregation operations process data records and return computed results. Think of it as a pipeline where documents pass through multiple stages.</p>

<h3>Common Pipeline Stages</h3>

<h4>$match</h4>
<p>Filters documents, similar to find():</p>
<pre><code>{ $match: { status: "active" } }</code></pre>

<h4>$group</h4>
<p>Groups documents by a specified expression:</p>
<pre><code>{ 
  $group: { 
    _id: "$category",
    total: { $sum: "$amount" }
  }
}</code></pre>

<h4>$sort</h4>
<p>Orders documents:</p>
<pre><code>{ $sort: { createdAt: -1 } }</code></pre>

<h3>Real-World Example</h3>
<p>Here's a practical aggregation to find top-selling products:</p>

<pre><code>db.orders.aggregate([
  { $match: { status: "completed" } },
  { $unwind: "$items" },
  { 
    $group: {
      _id: "$items.productId",
      totalSold: { $sum: "$items.quantity" }
    }
  },
  { $sort: { totalSold: -1 } },
  { $limit: 10 }
])</code></pre>`,
        tips: "Use $match as early as possible in your pipeline to reduce the number of documents processed.",
        learnings: "Aggregations can replace complex application logic with efficient database operations.",
        tags: ["MongoDB", "Database", "NoSQL", "Backend"],
        isDraft: false
    },
    {
        title: "CSS Grid vs Flexbox: When to Use Each",
        content: `<h2>Choosing the Right Layout Tool</h2>
<p>Both CSS Grid and Flexbox are powerful layout systems, but they excel in different scenarios. Let's break down when to use each.</p>

<h3>Flexbox: One-Dimensional Layouts</h3>
<p>Flexbox is perfect for laying out items in a single direction (row or column).</p>

<p><strong>Best for:</strong></p>
<ul>
<li>Navigation bars</li>
<li>Card layouts in a row</li>
<li>Centering content</li>
<li>Distributing space between items</li>
</ul>

<pre><code>.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}</code></pre>

<h3>CSS Grid: Two-Dimensional Layouts</h3>
<p>Grid excels at creating complex layouts with rows AND columns.</p>

<p><strong>Best for:</strong></p>
<ul>
<li>Page layouts</li>
<li>Image galleries</li>
<li>Dashboard layouts</li>
<li>Any layout with both rows and columns</li>
</ul>

<pre><code>.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}</code></pre>

<h3>Can You Use Both?</h3>
<p>Absolutely! In fact, combining them is common. Use Grid for the overall page layout and Flexbox for components within grid items.</p>

<h3>Quick Decision Guide</h3>
<p>Ask yourself: "Is my layout one-dimensional or two-dimensional?"</p>
<ul>
<li>One dimension → Flexbox</li>
<li>Two dimensions → Grid</li>
</ul>`,
        tips: "Don't overthink it! Both are great tools. Start with what feels natural and refactor if needed.",
        learnings: "Modern CSS makes layouts so much easier than the float-based layouts of the past!",
        tags: ["CSS", "Frontend", "Web Design", "Layout"],
        isDraft: false
    },
    {
        title: "Debugging JavaScript: Tips and Tricks",
        content: `<h2>Become a Debugging Master</h2>
<p>Debugging is an essential skill for every developer. Here are my favorite techniques and tools.</p>

<h3>Console Methods Beyond console.log()</h3>

<h4>console.table()</h4>
<p>Display arrays and objects in a nice table format:</p>
<pre><code>console.table([
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 }
]);</code></pre>

<h4>console.time() and console.timeEnd()</h4>
<p>Measure performance:</p>
<pre><code>console.time('API Call');
await fetchData();
console.timeEnd('API Call');</code></pre>

<h4>console.trace()</h4>
<p>See the call stack:</p>
<pre><code>console.trace('How did we get here?');</code></pre>

<h3>Browser DevTools</h3>
<p>Master these features:</p>
<ul>
<li><strong>Breakpoints:</strong> Pause execution at specific lines</li>
<li><strong>Watch expressions:</strong> Monitor variable values</li>
<li><strong>Call stack:</strong> See the execution path</li>
<li><strong>Network tab:</strong> Debug API calls</li>
</ul>

<h3>Common Debugging Strategies</h3>
<ol>
<li>Reproduce the bug consistently</li>
<li>Isolate the problem area</li>
<li>Form a hypothesis</li>
<li>Test your hypothesis</li>
<li>Fix and verify</li>
</ol>

<h3>The Rubber Duck Method</h3>
<p>Explain your code line-by-line to a rubber duck (or any object). Often, you'll spot the issue while explaining!</p>`,
        tips: "Use debugger; statement to create breakpoints directly in your code. The browser will pause when it hits this line.",
        learnings: "Good debugging skills can save you hours of frustration. Invest time in learning your tools!",
        tags: ["JavaScript", "Debugging", "DevTools", "Tips"],
        isDraft: false
    },
    {
        title: "Authentication Best Practices with JWT",
        content: `<h2>Secure Authentication with JSON Web Tokens</h2>
<p>Implementing authentication correctly is crucial for application security. Let's explore JWT best practices.</p>

<h3>What is JWT?</h3>
<p>JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims between two parties. They're commonly used for authentication.</p>

<h3>JWT Structure</h3>
<p>A JWT consists of three parts:</p>
<ul>
<li><strong>Header:</strong> Token type and hashing algorithm</li>
<li><strong>Payload:</strong> Claims (user data)</li>
<li><strong>Signature:</strong> Verification signature</li>
</ul>

<h3>Implementation Example</h3>
<pre><code>const jwt = require('jsonwebtoken');

// Generate token
const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Verify token
const decoded = jwt.verify(token, process.env.JWT_SECRET);</code></pre>

<h3>Security Best Practices</h3>
<ol>
<li><strong>Use HTTPS:</strong> Always transmit tokens over HTTPS</li>
<li><strong>Short expiration:</strong> Set reasonable expiration times</li>
<li><strong>Secure storage:</strong> Store tokens in httpOnly cookies or secure storage</li>
<li><strong>Strong secrets:</strong> Use long, random JWT secrets</li>
<li><strong>Refresh tokens:</strong> Implement refresh token rotation</li>
</ol>

<h3>Common Mistakes to Avoid</h3>
<ul>
<li>Storing sensitive data in the payload (it's not encrypted!)</li>
<li>Using weak secrets</li>
<li>Not validating tokens on every request</li>
<li>Storing tokens in localStorage (vulnerable to XSS)</li>
</ul>`,
        tips: "Never store sensitive information like passwords in JWT payload. The payload is base64 encoded, not encrypted!",
        learnings: "Security is not optional. Take time to understand authentication properly before implementing it.",
        codeSnippet: `// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalid' });
  }
};`,
        tags: ["Authentication", "Security", "JWT", "Backend", "Node.js"],
        isDraft: false
    }
];

const seedMockData = async () => {
    try {
        await connectDB();

        console.log('🌱 Starting mock data seeding...');

        // Check if we have any users, if not create a demo user
        let demoUser = await User.findOne({ email: 'demo@linkread.com' });

        if (!demoUser) {
            console.log('Creating demo user...');
            const hashedPassword = await bcrypt.hash('demo123', 10);
            demoUser = await User.create({
                username: 'DemoAuthor',
                email: 'demo@linkread.com',
                password: hashedPassword,
                profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
                bio: 'Tech enthusiast and full-stack developer sharing knowledge with the community.'
            });
            console.log('✅ Demo user created');
        }

        // Create another user for variety
        let secondUser = await User.findOne({ email: 'sarah@linkread.com' });

        if (!secondUser) {
            const hashedPassword = await bcrypt.hash('sarah123', 10);
            secondUser = await User.create({
                username: 'SarahDev',
                email: 'sarah@linkread.com',
                password: hashedPassword,
                profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
                bio: 'Frontend developer passionate about creating beautiful user experiences.'
            });
            console.log('✅ Second user created');
        }

        // Assign posts to users alternately
        const users = [demoUser, secondUser];

        for (let i = 0; i < mockPosts.length; i++) {
            const postData = {
                ...mockPosts[i],
                author: users[i % users.length]._id
            };

            const post = await Post.create(postData);

            // Add some random upvotes (between 3-15 upvotes per post)
            const upvoteCount = Math.floor(Math.random() * 13) + 3;
            for (let j = 0; j < upvoteCount; j++) {
                // In a real scenario, these would be actual user IDs
                // For now, we'll just add the existing users as upvoters
                if (j === 0) post.upvotes.push(demoUser._id);
                if (j === 1) post.upvotes.push(secondUser._id);
            }

            await post.save();
            console.log(`✅ Created post: "${post.title}"`);
        }

        console.log(`\n🎉 Successfully seeded ${mockPosts.length} mock blog posts!`);
        console.log('📧 Demo user credentials:');
        console.log('   Email: demo@linkread.com');
        console.log('   Password: demo123');
        console.log('\n📧 Second user credentials:');
        console.log('   Email: sarah@linkread.com');
        console.log('   Password: sarah123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during seeding:', error);
        process.exit(1);
    }
};

seedMockData();
