select patient_details.id,
       firstname,
       lastname,
       age,
       city,
       sum(total) as 'total',
       sum(paid) as 'paid',
       sum(due) as 'due' 
from patient_details
join details
    on patient_details.id=details.patient_id
GROUP BY patient_id
ORDER BY due desc;
