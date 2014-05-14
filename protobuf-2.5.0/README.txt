SELECT activity_log_id, eau.user_id, eau.user_name, eal.org_id, logged_on, action_type, functional_area, args, message, server_name, client_ip 
FROM explorys.activity_log AS eal 
INNER JOIN explorys_administration.user AS eau ON eal.user_id = eau.user_id 
WHERE (eal.org_id = 2) AND eau.internal_external = 'EXTERNAL' AND eau.user_id <> 1 AND (eal.logged_on >= '2014-05-13') AND (eal.logged_on <= '2014-05-14') 

UNION 

SELECT activity_log_id, eau.user_id, eau.user_name, pal.org_id, logged_on, action_type, functional_area, args, message, server_name, client_ip 
FROM perfex.activity_log AS pal 
INNER JOIN explorys_administration.user AS eau ON pal.user_id = eau.user_id 
WHERE (pal.org_id = 2) AND eau.internal_external = 'EXTERNAL' AND eau.user_id <> 1 AND (pal.logged_on >= '2014-05-13') AND (pal.logged_on <= '2014-05-14') 

ORDER BY logged_on DESC LIMIT 5000



com.mysql.jdbc.JDBC4PreparedStatement@1a7b1ee2: SELECT activity_log_id, eau.user_id, eau.user_name, eal.org_id, logged_on, action_type, functional_area, args, message, server_name, client_ip FROM explorys.activity_log AS eal INNER JOIN explorys_administration.user AS eau ON eal.user_id = eau.user_id WHERE (eal.org_id = 2) AND eau.internal_external = 'EXTERNAL' AND eau.user_id <> 1 AND (eal.logged_on >= '2014-05-13') AND (eal.logged_on <= '2014-05-14') UNION SELECT activity_log_id, eau.user_id, eau.user_name, pal.org_id, logged_on, action_type, functional_area, args, message, server_name, client_ip FROM perfex.activity_log AS pal INNER JOIN explorys_administration.user AS eau ON pal.user_id = eau.user_id WHERE (pal.org_id = 2) AND eau.internal_external = 'EXTERNAL' AND eau.user_id <> 1 AND (pal.logged_on >= '2014-05-13') AND (pal.logged_on <= '2014-05-14') ORDER BY logged_on DESC LIMIT 5000