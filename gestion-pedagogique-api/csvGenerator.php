<?php
// Fonction pour générer un matricule unique
function generateMatricule()
{
  return uniqid('STD');
}

// Les données des élèves
$students = [
  ["John Doe", "johndoe@example.com", generateMatricule(), "1995-03-15", "New York"],
  ["Jane Smith", "janesmith@example.com", generateMatricule(), "1998-07-21", "Los Angeles"],
  ["Michael Johnson", "michaeljohnson@example.com", generateMatricule(), "1997-12-10", "Chicago"],
  ["Emily Brown", "emilybrown@example.com", generateMatricule(), "1996-05-04", "Miami"],
  ["Daniel Lee", "daniellee@example.com", generateMatricule(), "1999-09-28", "Houston"],
  ["Sophia Wilson", "sophiawilson@example.com", generateMatricule(), "1994-02-09", "Philadelphia"],
  ["William Clark", "williamclark@example.com", generateMatricule(), "2000-11-17", "Phoenix"],
  ["Olivia Davis", "oliviadavis@example.com", generateMatricule(), "1993-06-23", "Dallas"],
  ["James Taylor", "jamestaylor@example.com", generateMatricule(), "1992-08-30", "San Francisco"],
  ["Emma Anderson", "emmaanderson@example.com", generateMatricule(), "1991-10-12", "Seattle"],
  ["Liam Martinez", "liammartinez@example.com", generateMatricule(), "1990-04-05", "Denver"],
  ["Ava Rodriguez", "avarodriguez@example.com", generateMatricule(), "1999-01-02", "San Diego"],
  ["Benjamin Turner", "benjaminturner@example.com", generateMatricule(), "1989-07-19", "Detroit"],
  ["Mia Harris", "miaharris@example.com", generateMatricule(), "1998-03-14", "Atlanta"],
  ["Ethan Baker", "ethanbaker@example.com", generateMatricule(), "1997-12-01", "Boston"],
  ["Isabella Young", "isabellayoung@example.com", generateMatricule(), "1996-06-08", "Portland"],
  ["Oliver Rodriguez", "oliverrodriguez@example.com", generateMatricule(), "1995-09-25", "Minneapolis"],
  ["Charlotte Johnson", "charlottejohnson@example.com", generateMatricule(), "1994-11-03", "St. Louis"],
  ["Noah Scott", "noahscott@example.com", generateMatricule(), "1993-04-20", "Las Vegas"],
  ["Amelia White", "ameliawhite@example.com", generateMatricule(), "1992-02-27", "Orlando"]
];

// Créez le fichier CSV
$csvFileName = "students.csv";

$file = fopen($csvFileName, "w");
if ($file) {
  fputcsv($file, ["Name", "Email", "Matricule", "Birth date", "Birth place"]);
  foreach ($students as $student) {
    fputcsv($file, $student);
  }
  fclose($file);
  echo "Le fichier CSV a été généré avec succès.";
} else {
  echo "Erreur lors de la création du fichier CSV.";
}
