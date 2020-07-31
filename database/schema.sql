/* 
// ran by using the command:
sudo mysql < database/schema.sql
*/

CREATE DATABASE IF NOT EXISTS ESS;

USE ESS;

CREATE TABLE IF NOT EXISTS course (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(50) COLLATE utf8_bin DEFAULT NULL,
  domain varchar(100) COLLATE utf8_bin DEFAULT NULL,
  description varchar(100) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY name (name)
);


CREATE TABLE IF NOT EXISTS test (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  course_id int(10) unsigned NOT NULL,
  num_of_questions int(10) unsigned NOT NULL,
  name varchar(50) COLLATE utf8_bin DEFAULT NULL,
  duration varchar(10) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (course_id) 
    REFERENCES course (id)
    ON DELETE CASCADE
);


INSERT INTO course (name, domain, description) VALUES ('EMT', 'Medical', 'Exams and CE for emergency medical providers');
INSERT INTO course (name, domain, description) VALUES ('Irrigation', 'Home Services', 'Training and CE for licensed irrigators & techs');
INSERT INTO course (name, domain, description) VALUES ('AML', 'Finance', 'FINRA complaint AML training');
INSERT INTO course (name, domain, description) VALUES ('CPA', 'Finance', 'CPA to meet CPE requirements');


INSERT INTO test (course_id, num_of_questions, name, duration) VALUES ((SELECT id FROM course WHERE name = 'EMT' LIMIT 1), 50, 'CPR', '1 hour');
INSERT INTO test (course_id, num_of_questions, name, duration) VALUES ((SELECT id FROM course WHERE name = 'EMT' LIMIT 1), 20, 'Heimlick Maneuver', '30 minutes');
INSERT INTO test (course_id, num_of_questions, name, duration) VALUES ((SELECT id FROM course WHERE name = 'EMT' LIMIT 1), 100, 'First Aid', '1 hour');

INSERT INTO test (course_id, num_of_questions, name, duration) VALUES ((SELECT id FROM course WHERE name = 'Irrigation' LIMIT 1), 100, 'Irrigation License', '2 hours');
INSERT INTO test (course_id, num_of_questions, name, duration) VALUES ((SELECT id FROM course WHERE name = 'Irrigation' LIMIT 1), 50, 'Backflow Certification', '60 minutes');

INSERT INTO test (course_id, num_of_questions, name, duration) VALUES ((SELECT id FROM course WHERE name = 'AML' LIMIT 1), 10, 'Ethics', '20 minutes');
INSERT INTO test (course_id, num_of_questions, name, duration) VALUES ((SELECT id FROM course WHERE name = 'AML' LIMIT 1), 10, 'When to file a SAR', '10 minutes');
INSERT INTO test (course_id, num_of_questions, name, duration) VALUES ((SELECT id FROM course WHERE name = 'AML' LIMIT 1), 20, 'Customer Profiles', '30 minutes');

INSERT INTO test (course_id, num_of_questions, name, duration) VALUES ((SELECT id FROM course WHERE name = 'CPA' LIMIT 1), 20, 'Ethics', '30 minutes');
INSERT INTO test (course_id, num_of_questions, name, duration) VALUES ((SELECT id FROM course WHERE name = 'CPA' LIMIT 1), 200, 'Accounting & Auditing', '2 hours');
INSERT INTO test (course_id, num_of_questions, name, duration) VALUES ((SELECT id FROM course WHERE name = 'CPA' LIMIT 1), 100, 'Tax', '1 hour');
INSERT INTO test (course_id, num_of_questions, name, duration) VALUES ((SELECT id FROM course WHERE name = 'CPA' LIMIT 1), 100, 'Financial Planning', '1 hour');









