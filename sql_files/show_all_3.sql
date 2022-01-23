SELECT patient_details.id as 'ID',
firstname,
lastname,
age,city,
sum(total) as 'total',
sum(paid)  as'paid',
sum(due) as 'due' from details 
join patient_details 
    on patient_details.id=details.patient_id 
GROUP by patient_id
ORDER by total ASC