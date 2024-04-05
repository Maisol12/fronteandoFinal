import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import ReactQuillEditor from 'components/elements/editor/ReactQuillEditor';
import {FormSelect} from 'components/elements/form-select/FormSelect'; // Asegúrate de que este import es correcto
import Icon from '@mdi/react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { mdiArrowRight, mdiUpload } from '@mdi/js';
import GKTagsInput from 'components/elements/tags/GKTagsInput';

const BasicInformation = (props) => {
  // Estados para cada campo del formulario
  const [courseTitle, setCourseTitle] = useState('');
  const [category, setCategory] = useState(''); // Ahora como cadena
  const [level, setLevel] = useState(''); // Ahora como cadena
  const [description, setDescription] = useState('');
  const [applicantRequirements, setApplicantRequirements] = useState('');
  const [courseImage, setCourseImage] = useState('');

  

  // Manejador para el cambio en los inputs
  const handleInputChange = (e, setState) => {
    const { value } = e.target;
    setState(value);
  };

  const categoryOptions = [
    { value: "React", label: "React" },
    { value: "Javascript", label: "Javascript" },
    { value: "HTML", label: "HTML" },
    { value: "Vuejs", label: "Vue js" },
    { value: "Gulpjs", label: "Gulp js" },
  ];

  const levelOptions = [
    { value: "Intermedio", label: "Intermedio" },
    { value: "Principiante", label: "Principiante" },
    { value: "Avanzado", label: "Avanzado" },
  ];
  
  const handleCategoryChange = (value) => {
    setCategory(value);
  };
  
  const handleLevelChange = (value) => {
    setLevel(value);
  }

  // Manejador para la selección de imágenes
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCourseImage(reader.result.toString());
    };
    reader.readAsDataURL(file);
  };

  <ReactQuillEditor
  initialValue={description}
  id="course_description"
  name="course_description"
/>

  // Manejador para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Verificar si la categoría y el nivel están seleccionados
    if (!category || !level) {
      alert("Categoría y nivel son campos requeridos.");
      return;
    }
  
    const formData = {
      title: courseTitle,
      category,
      level,
      description,
      applicant_requirements: applicantRequirements,
      courseImage,
    };
  
    console.log("Form data being sent:", formData);
  
    try {
      const response = await fetch('http://localhost:3001/create-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        // Si el servidor responde con un estado de error, lanzar un error
        throw new Error('La respuesta del servidor no fue OK');
      }
  
      // Si la respuesta es exitosa, mostrar alerta y redirigir
      alert('Se creó el curso con éxito');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Error al crear el curso');
    }
  };
  

  return (
	<Form onSubmit={handleSubmit}>
	  {/* Card */}
	  <Card className="mb-3">
		<Card.Header className="border-bottom px-4 py-3">
		  <h4 className="mb-0">Información básica</h4>
		</Card.Header>
		{/* Card body */}
		<Card.Body>
		  {/* Title */}
		  <Form.Group className="mb-3">
			<Form.Label htmlFor="courseTitle">Título del curso</Form.Label>
			<Form.Control
			  type="text"
			  placeholder="Título"
			  id="course_title"
			  name="course_title"
			  value={courseTitle}
			  onChange={(e) => handleInputChange(e, setCourseTitle)}
			/>
			<Form.Text className="text-muted">Máximo 60 caracteres.</Form.Text>
		  </Form.Group>
  
		  {/* Category */}
		  <Form.Group className="mb-3">
        <Form.Label>Categoría</Form.Label>
        <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Selecciona una categoría</option>
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </Form.Control>
      </Form.Group>
  
		  {/* Courses level */}
      <Form.Group className="mb-3">
        <Form.Label>Nivel del curso</Form.Label>
        <Form.Control as="select" value={level} onChange={(e) => setLevel(e.target.value)}>
          <option>Selecciona un nivel</option>
          {levelOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </Form.Control>
      </Form.Group>
  
		  {/* Course Description*/}
		  <Form.Group className="mb-3">
		  <Form.Label htmlFor="applicantRequirements">
			  Descripcion del curso
			</Form.Label>
			<Form.Control
			  type="text"
			  placeholder="Descripcion"
			  id="description"
			  name="description"
			  value={description}
			  onChange={(e) => handleInputChange(e, setDescription)}
			/>
			<Form.Text className="text-muted">
			  Una pequeña descripción del curso para atraer a los estudiantes potenciales.
			 Máximo 500 caracteres.
			</Form.Text>
		  </Form.Group>
		  {/* Course cover image */}
		  <Form.Group className="mb-3">
			<Form.Label>Portada del curso</Form.Label>
			<Form.Control
			  id="courseImage"
			  type="file"
			  onChange={handleImageChange}
			/>
			<Form.Text className="text-muted">
			  Sube la imagen de tu curso aquí. Debe cumplir con nuestros
			  estándares de calidad de imagen para ser aceptada. Pautas
			  importantes: 750x440 píxeles; .jpg, .jpeg, .gif o .png. sin texto
			  en la imagen.
			</Form.Text>
		  </Form.Group>
		  {/* Applicant Requirements */}
		  <Form.Group className="mb-3">
			<Form.Label htmlFor="applicantRequirements">
			  Requisitos del aspirante
			</Form.Label>
			<Form.Control
			  type="text"
			  placeholder="Requisitos"
			  id="applicant_requirements"
			  name="applicant_requirements"
			  value={applicantRequirements}
			  onChange={(e) => handleInputChange(e, setApplicantRequirements)}
			/>
			<Form.Text className="text-muted">
			  Máximo 60 caracteres.
			</Form.Text>
		  </Form.Group>
		</Card.Body>
	  </Card>
	  {/* Button */}
	  <Container className="text-end">
		<Button
		  type="submit"
		  style={{
			backgroundColor: "#042b61",
			borderColor: "white",
			color: "white",
		  }}
		>
		  Mandar a revisión <Icon path={mdiUpload} size={0.8} />
		</Button>
	  </Container>
	</Form>
  );}
  

export default BasicInformation;