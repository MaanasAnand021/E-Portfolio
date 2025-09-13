const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Maanas Anand | Portfolio',
        currentPage: 'home'
    });
});

app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'About Me | Maanas Anand',
        currentPage: 'about'
    });
});

app.get('/education', (req, res) => {
    res.render('education', { 
        title: 'Education | Maanas Anand',
        currentPage: 'education'
    });
});

app.get('/skills', (req, res) => {
    res.render('skills', { 
        title: 'Skills | Maanas Anand',
        currentPage: 'skills'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects', { 
        title: 'Projects | Maanas Anand',
        currentPage: 'projects'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', { 
        title: 'Contact | Maanas Anand',
        currentPage: 'contact'
    });
});

// Handle contact form submission
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // Here you would typically save to database or send email
    console.log('Contact form submission:', { name, email, message });
    
    res.json({ 
        success: true, 
        message: 'Thank you for your message! I will get back to you soon.' 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', { 
        title: 'Page Not Found | Maanas Anand',
        currentPage: '404'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { 
        title: 'Server Error | Maanas Anand',
        currentPage: 'error'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});
