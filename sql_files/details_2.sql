SELECT patient_details.id as 'ID',concat(firstname,' ',lastname) as 'Name',age ,city,
sum(total) as 'Total',
sum(paid)  as'Paid',
sum(due) as 'Due' from details 
join patient_details 
    on patient_details.id=details.patient_id 
where patient_id= ?    
group by patient_id
