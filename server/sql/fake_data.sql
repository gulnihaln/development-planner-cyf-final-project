
-- fake users 

INSERT INTO users (first_name, last_name, region, email, role, password ) VALUES ('Morteza', 'Khojasteh', 'North-west4', 'Morteza.khojaste@gmail.com','graduate', '12345678');
INSERT INTO users (first_name, last_name, region, email, role, password ) VALUES ('Gulnihal', 'N', 'North-west4', 'gh.naldoken@gmail.com','graduate', '12345678');
INSERT INTO users (first_name, last_name, region, email, role, password ) VALUES ('Ali', 'Bavarsad', 'North-west4', 'A.Bavarsad007@gmail.com','graduate', '12345678');
INSERT INTO users (first_name, last_name, region, email, role, password ) VALUES ('Maziar', 'Majd', 'North-west4', ' Majd@gmail.com','graduate', '12345678');
INSERT INTO users (first_name, last_name, region, email, role, password ) VALUES ('Elena', 'Cavallero', 'North-west4', 'Elena@gmail.com','mentor', '12345678');
INSERT INTO users (first_name, last_name, region, email, role, password ) VALUES ('Vlad', 'Ene', 'North-west4', 'Vlad@gmail.com','mentor', '12345678');


-- fake plans 

INSERT INTO plans (user_id, description) VALUES ('b815f225-5d3d-48cb-a0d0-2bd36edde58c', 'I want to learn (morteza)');
INSERT INTO plans (user_id, description) VALUES ('8e6b2850-df0b-4f5a-8df0-157caa1f7e14', 'I want to learn (gulnihal)');
INSERT INTO plans (user_id, description) VALUES ('1fa2740d-370c-4877-a780-cd60f9f667f6', 'I want to learn (ali)');
INSERT INTO plans (user_id, description) VALUES ('907bb0ce-dd6e-4434-8eb9-e1ae3f85a4cf', 'I want to learn (maziar)');
INSERT INTO plans (user_id, description) VALUES ('0b62df8c-6130-4ab6-a87d-adb1ad1884c6', 'I want to learn (elena)');
INSERT INTO plans (user_id, description) VALUES ('4dd48d93-969e-4f3d-9826-0c0f508a6648', 'I want to learn (vlad)');


-- fake goals

INSERT INTO goals (plan_id, title, status, start_date, end_date) VALUES ('1', 'javaScript', 'in progress', '2022-01-12','2022-01-30');
INSERT INTO goals (plan_id, title, status, start_date, end_date) VALUES ('2', 'php', 'done', '2022-01-01','2022-01-12');
INSERT INTO goals (plan_id, title, status, start_date, end_date) VALUES ('3', 'c++', 'in progress', '2022-01-13','2022-02-12');
INSERT INTO goals (plan_id, title, status, start_date, end_date) VALUES ('3', 'html', 'not start', '2022-01-15','2022-02-25');


-- fake tasks

INSERT INTO tasks (goal_id, description, status) VALUES ('1', 'I started with freecodecamp', 'in progress');
INSERT INTO tasks (goal_id, description, status) VALUES ('2', 'self study', 'done');
INSERT INTO tasks (goal_id, description, status) VALUES ('3', 'from youtobe', 'in progress');
INSERT INTO tasks (goal_id, description, status) VALUES ('4', 'soloLearn', 'not start');


-- fake feedbacks

INSERT INTO feedbacks (user_id, plan_id, description) VALUES ('0b62df8c-6130-4ab6-a87d-adb1ad1884c6', '1', 'well done');
INSERT INTO feedbacks (user_id, plan_id, description) VALUES ('4dd48d93-969e-4f3d-9826-0c0f508a6648', '1', 'good job!');
INSERT INTO feedbacks (user_id, plan_id, description) VALUES ('4dd48d93-969e-4f3d-9826-0c0f508a6648', '2', 'perfect!');
INSERT INTO feedbacks (user_id, plan_id, description) VALUES ('0b62df8c-6130-4ab6-a87d-adb1ad1884c6', '3', 'you can use this web site');
INSERT INTO feedbacks (user_id, plan_id, description) VALUES ('4dd48d93-969e-4f3d-9826-0c0f508a6648', '4', 'you should start as soon as posible');
INSERT INTO feedbacks (user_id, plan_id, description) VALUES ('0b62df8c-6130-4ab6-a87d-adb1ad1884c6', '2', 'keep going!!');

