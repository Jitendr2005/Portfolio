require('dotenv').config();
const mongoose = require('mongoose');
const Certificate = require('./models/Certificate');
const Skill = require('./models/Skill');
const Project = require('./models/Project');
const User = require('./models/User');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data
    await Certificate.deleteMany({});
    await Skill.deleteMany({});
    await Project.deleteMany({});
    await User.deleteMany({});

    // Seed user for admin login
    const user = new User({ username: 'Jitendratyagi', password: 'Jeetu@2005' });
    await user.save();

    // Seed certificates
    const certificates = [
      {
        title: 'Artificial Intelligence Training',
        issuer: 'EDUNET FOUNDATION',
        date: new Date('2023-01-01'),
        description: '3 Days Duration'
      },
      {
        title: 'Python Programming',
        issuer: 'Data Flair',
        date: new Date('2023-01-01'),
        description: 'Certification Course'
      },
      {
        title: 'C Programming',
        issuer: 'Infosys Springboard',
        date: new Date('2023-01-01'),
        description: 'Professional Course'
      }
    ];

    // Seed skills
    const skills = [
      { name: 'C', level: 'Intermediate', category: 'Programming Languages' },
      { name: 'Python', level: 'Intermediate', category: 'Programming Languages' },
      { name: 'SQL', level: 'Intermediate', category: 'Programming Languages' },
      { name: 'HTML', level: 'Intermediate', category: 'Web Development' },
      { name: 'CSS', level: 'Intermediate', category: 'Web Development' },
      { name: 'JavaScript', level: 'Intermediate', category: 'Web Development' },
      { name: 'PHP', level: 'Intermediate', category: 'Web Development' },
      { name: 'MySQL', level: 'Intermediate', category: 'Database' },
      { name: 'Windows', level: 'Expert', category: 'Operating Systems' },
      { name: 'Artificial Intelligence', level: 'Beginner', category: 'Specialized Skills' }
    ];

    // Seed projects
    const projects = [
      {
        name: 'Hospital Management System',
        description: 'A comprehensive software application developed using Python to efficiently manage hospital operations and data flow. Features include patient registration, doctor scheduling, appointment booking, billing, and medical records management.',
        techStack: ['Python', 'Database Management', 'GUI Development', 'Data Flow Management'],
        github: 'https://github.com/Jitendr2005/Jitendratyagi',
        url: '#'
      },
      {
        name: 'Face Recognition Attendance System',
        description: 'An advanced, automated solution developed using Python that leverages facial recognition technology to record attendance securely and efficiently. Eliminates manual attendance methods using webcam-based real-time face recognition.',
        techStack: ['Python', 'OpenCV', 'Tkinter', 'Numpy', 'Facial Recognition', 'Computer Vision'],
        github: 'https://github.com/Jitendr2005/Jitendratyagi',
        url: '#'
      }
    ];

    await Certificate.insertMany(certificates);
    await Skill.insertMany(skills);
    await Project.insertMany(projects);

    console.log('Database seeded successfully!');
    console.log('Test login credentials:');
    console.log('  Username: Jitendratyagi');
    console.log('  Password: Jeetu@2005');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData(); 