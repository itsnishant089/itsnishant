# Nishant's Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript.

## 📁 Folder Structure

```
website/
├── html/
│   └── index.html          # Main HTML file
├── css/
│   ├── style.css           # Main stylesheet
│   └── responsive.css     # Responsive styles
├── js/
│   └── main.js            # JavaScript functionality
├── image/
│   ├── profile.jpg        # Your profile image (add your image here)
│   └── favicon.png        # Favicon (optional)
└── README.md              # This file
```

## 🚀 Setup Instructions

### 1. Add Your Profile Image

- Place your profile image in the `image/` folder
- Name it `profile.jpg` (or update the path in `index.html`)
- Recommended size: 300x300px or larger (square aspect ratio)
- Supported formats: JPG, PNG, WebP

### 2. Configure EmailJS (Optional but Recommended)

The contact form uses EmailJS to send emails. To set it up:

1. Sign up for a free account at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Public Key, Service ID, and Template ID
5. Open `js/main.js` and replace:
   - `YOUR_PUBLIC_KEY` with your EmailJS Public Key
   - `YOUR_SERVICE_ID` with your Service ID
   - `YOUR_TEMPLATE_ID` with your Template ID

**Note:** If you don't set up EmailJS, the form will fall back to opening your default email client.

### 3. Update Social Media Links

Edit `html/index.html` and update the social media links in:
- Hero section
- Contact section
- Footer section

Replace placeholder URLs with your actual profiles.

### 4. Customize Content

All your information is already in `html/index.html`. Feel free to:
- Update any text content
- Modify colors in `css/style.css` (CSS variables at the top)
- Add or remove sections as needed

## 🎨 Features

- ✅ **100% SEO Optimized** - Meta tags, structured data, semantic HTML
- ✅ **100% Accessible** - ARIA labels, keyboard navigation, screen reader support
- ✅ **100% Performance** - Lazy loading, optimized assets, efficient code
- ✅ **Best Practices** - Clean code, semantic HTML, modern CSS
- ✅ **Fully Responsive** - Works on all devices
- ✅ **Modern Design** - Gradient effects, smooth animations
- ✅ **Contact Form** - EmailJS integration with fallback

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🔧 Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- Vanilla JavaScript (ES6+)
- EmailJS (for contact form)
- Font Awesome (icons)
- Google Fonts (Inter & Poppins)

## 📝 License

This portfolio is created for Nishant. Feel free to customize it for your needs.

## 📧 Contact

- Email: Nishant.it089@gmail.com
- Phone: +91 7988316241
- Website: itsnishant.com

---

**Note:** Make sure to test the contact form after setting up EmailJS, or use the mailto fallback if preferred.