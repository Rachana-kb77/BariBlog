const express = require('express');
const router = express.Router();
const Blog = require('../models/blogModel'); // your Mongoose model

// Get all blogs
router.get('/', async (req, res) => {
  const blogs = await Blog.find().populate('author', 'username email');
  res.json(blogs);
});

// 👉 POST a new blog
router.post('/', async (req, res) => {
    try {
      const { title, content, author } = req.body;
      const newBlog = new Blog({ title, content, author });
      await newBlog.save();
      res.status(201).json(newBlog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

// GET a single blog by ID
router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('author', 'username email');
  res.json(blog);
});

// DELETE a blog by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete blog' });
  }
});

// UPDATE a blog by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, content, author } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true } // return the updated blog
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update blog' });
  }
});

module.exports = router;




















// const express = require('express');
// const router = express.Router();
// const Blog = require('../models/blogModel'); // your Mongoose model

// // Get all blogs
// router.get('/', async (req, res) => {
//     try {
//       const blogs = await Blog.find().sort({ createdAt: -1 }); // newest first
//       res.json(blogs);
//     } catch (err) {
//       res.status(500).json({ message: 'Failed to fetch blogs' });
//     }
//   });

// // 👉 POST a new blog
// router.post('/', async (req, res) => {
//     try {
//       const { title, content, author } = req.body;
//       const newBlog = new Blog({ title, content, author });
//       await newBlog.save();
//       res.status(201).json(newBlog);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   });

// // GET a single blog by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) {
//       return res.status(404).json({ message: 'Blog not found' });
//     }
//     res.json(blog);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // DELETE a blog by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
//     if (!deletedBlog) {
//       return res.status(404).json({ message: 'Blog not found' });
//     }
//     res.json({ message: 'Blog deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to delete blog' });
//   }
// });

// // UPDATE a blog by ID
// router.put('/:id', async (req, res) => {
//   try {
//     const { title, content, author } = req.body;

//     const updatedBlog = await Blog.findByIdAndUpdate(
//       req.params.id,
//       { title, content, author },
//       { new: true } // return the updated blog
//     );

//     if (!updatedBlog) {
//       return res.status(404).json({ message: 'Blog not found' });
//     }

//     res.json(updatedBlog);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to update blog' });
//   }
// });




// module.exports = router;












  
  
