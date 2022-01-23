

SELECT id,
        total,
        paid,
        due,
        DATE_FORMAT(date_time,'%D %M %Y %h:%i') as 'date_time',
        patient_id from details 
        where patient_id = ?
