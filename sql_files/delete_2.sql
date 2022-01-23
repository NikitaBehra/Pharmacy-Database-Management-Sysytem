DELETE from details
where patient_id = (
    SELECT id from patient_details
    where firstname= ? AND lastname= ?
)

