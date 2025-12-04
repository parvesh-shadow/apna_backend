const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const { connectDB } = require("./lib/db");

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow all origins
      callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/uploads", express.static("uploads"));

// Routes
const projectRoutes = require("./routes/project.route");
const authRoutes = require("./routes/auth.route");
const inquiryRoutes = require("./routes/inquiry.route");
const adminModel = require("./model/admin.model");

app.use("/api/v1/project", projectRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/inquiry", inquiryRoutes);

// Serve static files from frontend build
const frontendDistPath = path.join(__dirname, "../apna_project/dist/");
app.use(express.static(frontendDistPath, { index: false }));

// Import SEO template and Project model
const seoTemplate = require("./views/seoTemplate");
const Project = require("./model/Project.model");

// SSR Route Handler - Must be after API routes and static files
// Using regex pattern instead of * for Express 5.x compatibility
app.get(
  /^\/(?!api\/|uploads\/|assets\/|favicon\.ico|robots\.txt|sitemap\.xml).*/,
  async (req, res) => {
    try {
      const slug = req.path.replace("/", "").trim();

      // if (!slug) {
      //   return serveIndexFile(req, res); // homepage
      // }
      // Default SEO values
      let seoData = {
        title: "Apna Project",
        description: "Welcome to Apna Project",
        canonical: "",
        robots: "index, follow",
        ogTitle: "",
        ogDescription: "",
        scripts: [],
        bodyScripts: [],
      };

      // If slug exists, fetch SEO data from database
      if (slug && slug !== "") {
        const project = await Project.findOne({ "SEO.slug": slug });
        if (project && project.SEO) {
          seoData = {
            title: project?.SEO.title || seoData.title,
            description: project?.SEO.metaDescription || seoData.description,
            canonical: project?.SEO.canonical,
            robots: project?.SEO.robots,
            ogTitle: project?.SEO.ogTitle,
            ogDescription: project?.SEO.ogDescription,
            scripts: project?.SEO.scripts || [],
            bodyScripts: project?.SEO.bodyScripts || [],
          };
        }
      }

      // Read the built index.html to extract asset files
      const indexPath = path.join(frontendDistPath, "index.html");
      const indexHtml = fs.readFileSync(indexPath, "utf-8");

      // Extract CSS and JS files from the built index.html
      const cssMatches =
        indexHtml.match(/href="(\/assets\/[^"]+\.css)"/g) || [];
      const jsMatches = indexHtml.match(/src="(\/assets\/[^"]+\.js)"/g) || [];

      const cssFiles = cssMatches.map(
        (match) => match.match(/href="([^"]+)"/)[1]
      );
      const jsFiles = jsMatches.map((match) => match.match(/src="([^"]+)"/)[1]);

      // Generate HTML with SEO data
      const html = seoTemplate({
        title: seoData.title,
        description: seoData.description,
        canonical: seoData.canonical,
        robots: seoData.robots,
        ogTitle: seoData.ogTitle,
        ogDescription: seoData.ogDescription,
        scripts: seoData.scripts,
        bodyScripts: seoData.bodyScripts,
        appHtml: "", // Empty for now, React will hydrate on client side
        cssFiles,
        jsFiles,
      });
      // console.log(html, "html");
      res.send(html);
    } catch (error) {
      console.error("SSR Error:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Seed default admin
const seedDefaultAdmin = async () => {
  try {
    const adminEmail = "admin@gmail.com";
    const adminPassword = "123456789";

    const existingAdmin = await adminModel.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("✓ Default admin already exists");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    await adminModel.create({
      email: adminEmail,
      password: hashedPassword,
    });

    console.log("✓ Default admin created successfully");
    console.log(`  Email: ${adminEmail}`);
  } catch (error) {
    console.error("✗ Error seeding default admin:", error.message);
  }
};

// Start server
const startServer = async () => {
  await connectDB();
  await seedDefaultAdmin();

  app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT ${process.env.PORT}`);
  });
};

startServer();
