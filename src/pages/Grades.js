import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Chip,
  Avatar,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import {
  Grade as GradeIcon,
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

const mockGrades = [
  {
    id: 1,
    student: 'John Doe',
    course: 'Mathematics 101',
    assignment: 'Calculus Problem Set #1',
    grade: 85,
    maxGrade: 100,
    submitted: '2024-01-15',
    status: 'graded',
  },
  {
    id: 2,
    student: 'Sarah Wilson',
    course: 'Chemistry 101',
    assignment: 'Lab Report #2',
    grade: 92,
    maxGrade: 100,
    submitted: '2024-01-14',
    status: 'graded',
  },
  {
    id: 3,
    student: 'Michael Brown',
    course: 'Physics 201',
    assignment: 'Physics Quiz #1',
    grade: 78,
    maxGrade: 100,
    submitted: '2024-01-13',
    status: 'graded',
  },
  {
    id: 4,
    student: 'Emily Davis',
    course: 'Computer Science 101',
    assignment: 'Programming Assignment #1',
    grade: null,
    maxGrade: 100,
    submitted: '2024-01-12',
    status: 'pending',
  },
  {
    id: 5,
    student: 'David Johnson',
    course: 'Mathematics 101',
    assignment: 'Calculus Problem Set #1',
    grade: 95,
    maxGrade: 100,
    submitted: '2024-01-15',
    status: 'graded',
  },
];

const courses = ['All Courses', 'Mathematics 101', 'Physics 201', 'Chemistry 101', 'Computer Science 101'];
const assignments = ['All Assignments', 'Calculus Problem Set #1', 'Lab Report #2', 'Physics Quiz #1', 'Programming Assignment #1'];

function Grades() {
  const [grades, setGrades] = useState(mockGrades);
  const [selectedCourse, setSelectedCourse] = useState('All Courses');
  const [selectedAssignment, setSelectedAssignment] = useState('All Assignments');
  const [editingGrade, setEditingGrade] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredGrades = grades.filter(grade => {
    const courseMatch = selectedCourse === 'All Courses' || grade.course === selectedCourse;
    const assignmentMatch = selectedAssignment === 'All Assignments' || grade.assignment === selectedAssignment;
    return courseMatch && assignmentMatch;
  });

  const handleGradeEdit = (grade) => {
    setEditingGrade(grade.id);
    setEditValue(grade.grade?.toString() || '');
  };

  const handleGradeSave = (gradeId) => {
    const newGrade = parseInt(editValue);
    if (newGrade >= 0 && newGrade <= 100) {
      setGrades(grades.map(grade =>
        grade.id === gradeId
          ? { ...grade, grade: newGrade, status: 'graded' }
          : grade
      ));
    }
    setEditingGrade(null);
    setEditValue('');
  };

  const handleGradeCancel = () => {
    setEditingGrade(null);
    setEditValue('');
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setOpenDialog(true);
  };

  const getGradeColor = (grade) => {
    if (grade >= 90) return 'success';
    if (grade >= 80) return 'primary';
    if (grade >= 70) return 'warning';
    return 'error';
  };

  const getGradeLetter = (grade) => {
    if (grade >= 93) return 'A';
    if (grade >= 90) return 'A-';
    if (grade >= 87) return 'B+';
    if (grade >= 83) return 'B';
    if (grade >= 80) return 'B-';
    if (grade >= 77) return 'C+';
    if (grade >= 73) return 'C';
    if (grade >= 70) return 'C-';
    if (grade >= 67) return 'D+';
    if (grade >= 63) return 'D';
    if (grade >= 60) return 'D-';
    return 'F';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'graded': return 'success';
      case 'pending': return 'warning';
      case 'late': return 'error';
      default: return 'default';
    }
  };

  const averageGrade = grades
    .filter(grade => grade.grade !== null)
    .reduce((sum, grade) => sum + grade.grade, 0) / 
    grades.filter(grade => grade.grade !== null).length;

  const pendingGrades = grades.filter(grade => grade.status === 'pending').length;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Grade Management
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Average Grade
                  </Typography>
                  <Typography variant="h4" component="div">
                    {averageGrade.toFixed(1)}%
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56 }}>
                  <TrendingUpIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Pending Grades
                  </Typography>
                  <Typography variant="h4" component="div">
                    {pendingGrades}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main', width: 56, height: 56 }}>
                  <GradeIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Total Submissions
                  </Typography>
                  <Typography variant="h4" component="div">
                    {grades.length}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main', width: 56, height: 56 }}>
                  <SchoolIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Graded
                  </Typography>
                  <Typography variant="h4" component="div">
                    {grades.filter(grade => grade.status === 'graded').length}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                  <GradeIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Box display="flex" gap={2} mb={3}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Course</InputLabel>
          <Select
            value={selectedCourse}
            label="Course"
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            {courses.map((course) => (
              <MenuItem key={course} value={course}>
                {course}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Assignment</InputLabel>
          <Select
            value={selectedAssignment}
            label="Assignment"
            onChange={(e) => setSelectedAssignment(e.target.value)}
          >
            {assignments.map((assignment) => (
              <MenuItem key={assignment} value={assignment}>
                {assignment}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Grades Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Assignment</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Letter Grade</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Submitted</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGrades.map((grade) => (
              <TableRow key={grade.id} hover>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                      {grade.student.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Typography
                      variant="body2"
                      sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                      onClick={() => handleStudentClick(grade)}
                    >
                      {grade.student}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{grade.course}</TableCell>
                <TableCell>{grade.assignment}</TableCell>
                <TableCell>
                  {editingGrade === grade.id ? (
                    <Box display="flex" alignItems="center" gap={1}>
                      <TextField
                        size="small"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        sx={{ width: 80 }}
                      />
                      <IconButton size="small" onClick={() => handleGradeSave(grade.id)}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton size="small" onClick={handleGradeCancel}>
                        <CancelIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body2">
                        {grade.grade !== null ? `${grade.grade}/${grade.maxGrade}` : 'Not graded'}
                      </Typography>
                      <IconButton size="small" onClick={() => handleGradeEdit(grade)}>
                        <EditIcon />
                      </IconButton>
                    </Box>
                  )}
                </TableCell>
                <TableCell>
                  {grade.grade !== null && (
                    <Chip
                      label={getGradeLetter(grade.grade)}
                      color={getGradeColor(grade.grade)}
                      size="small"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Chip
                    label={grade.status}
                    color={getStatusColor(grade.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{grade.submitted}</TableCell>
                <TableCell>
                  <Button size="small" color="primary">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Student Details Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Student Grade History
        </DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedStudent.student} - {selectedStudent.course}
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Assignment</TableCell>
                      <TableCell>Grade</TableCell>
                      <TableCell>Letter Grade</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {grades
                      .filter(grade => grade.student === selectedStudent.student && grade.course === selectedStudent.course)
                      .map((grade) => (
                        <TableRow key={grade.id}>
                          <TableCell>{grade.assignment}</TableCell>
                          <TableCell>
                            {grade.grade !== null ? `${grade.grade}/${grade.maxGrade}` : 'Not graded'}
                          </TableCell>
                          <TableCell>
                            {grade.grade !== null && (
                              <Chip
                                label={getGradeLetter(grade.grade)}
                                color={getGradeColor(grade.grade)}
                                size="small"
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={grade.status}
                              color={getStatusColor(grade.status)}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Grades; 