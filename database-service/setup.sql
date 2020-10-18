/***CREATING ALL TABLES*/

CREATE TABLE  projects (
  id   VARCHAR(40)  PRIMARY KEY  NOT NULL,
  name    VARCHAR(40)                    NULL,
  description     VARCHAR(255)                    NULL,
  created_at        DATETIME                    NULL,
  modified_at      DATETIME                   NULL
) ENGINE = INNODB;

CREATE TABLE  issues (
  id   VARCHAR(40)  PRIMARY KEY  NOT NULL,
  summary    VARCHAR(40)                    NULL,
  status    VARCHAR(40)                    NULL,
  projectId    VARCHAR(40)                    NULL,
  description     VARCHAR(255)                    NULL,
  related_issues     VARCHAR(255)                    NULL,
  created_at        DATETIME                    NULL,
  modified_at      DATETIME                   NULL
);
