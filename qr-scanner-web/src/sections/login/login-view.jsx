import { useState } from 'react'; // Import Axios or any other HTTP client library

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// ----------------------------------------------------------------------
export default function LoginView() {
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    regNo: '',
    name: '',
    degree: '',
    specField: '',
    university: '',
    graduationYear: '',
    qualification: '',
    academicRank: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleIdChange = (event) => {
    const { value } = event.target;
    setId(value);
  };

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://hjx2bm1h-3000.inc1.devtunnels.ms/user/${id}`); // Make API call to fetch data by regNo
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const doctorData = await response.json();
      setFormData(doctorData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching doctor data:', error);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: 1, backgroundImage: `url(/bg.jpg)` }}>
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 3,
            width: 1,
            maxWidth: 520,
          }}
        >
          <Typography variant="h6">Verify Yourself with Afghanistan Medical Council</Typography>

          <Divider sx={{ my: 3 }} />
          <TextField
            name="regNo"
            label="AMC Registration Number"
            size="small"
            fullWidth
            value={id}
            onChange={handleIdChange}
          />
          <Divider sx={{ my: 3 }} />

          {formData?.regNo && (
            <Stack spacing={2}>
              <Stack direction="row" gap={2}>
                <TextField
                  disabled
                  name="regNo"
                  label="AMC Number"
                  size="small"
                  fullWidth
                  value={formData.regNo}
                  onChange={handleChange}
                />
                <TextField
                  disabled
                  name="name"
                  label="Name"
                  size="small"
                  fullWidth
                  value={formData.name}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" gap={2}>
                <TextField
                  disabled
                  name="degree"
                  label="Degree"
                  size="small"
                  fullWidth
                  value={formData.degree}
                  onChange={handleChange}
                />
                <TextField
                  disabled
                  name="specField"
                  label="Specialization Field"
                  size="small"
                  fullWidth
                  value={formData.specField}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" gap={2}>
                <TextField
                  disabled
                  name="university"
                  label="University"
                  size="small"
                  fullWidth
                  value={formData.university}
                  onChange={handleChange}
                />
                <TextField
                  disabled
                  name="graduationYear"
                  label="Graduation Year"
                  size="small"
                  fullWidth
                  value={formData.graduationYear}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" gap={2}>
                <TextField
                  disabled
                  name="qualification"
                  label="Qualification"
                  size="small"
                  fullWidth
                  value={formData.qualification}
                  onChange={handleChange}
                />
                <TextField
                  disabled
                  name="academicRank"
                  label="Academic Rank"
                  size="small"
                  fullWidth
                  value={formData.academicRank}
                  onChange={handleChange}
                />
              </Stack>
            </Stack>
          )}
          <LoadingButton
            sx={{ mt: 2 }}
            fullWidth
            size="large"
            type="button"
            variant="contained"
            color="primary"
            loading={loading}
            disabled={!id}
            onClick={handleClick}
          >
            Search
          </LoadingButton>
        </Card>
      </Stack>
    </Box>
  );
}
