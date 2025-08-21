CREATE TABLE location (
      location_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
      road_name_address VARCHAR(200),
      detail_address VARCHAR(200),
      postal_code VARCHAR(10),
      sido VARCHAR(20),
      sigungu VARCHAR(20),
      emdong VARCHAR(20),
      latitude DECIMAL(9, 6),
      longitude DECIMAL(9, 6)
);

CREATE TABLE price (
       price_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
       deposit INT NOT NULL,
       monthly_rent INT NOT NULL
);

CREATE TABLE living_index (
      living_index_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
      security_score INT,
      disaster_safety_score INT,
      store_score INT,
      noise_safety_score INT
);

CREATE TABLE room (
      room_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
      room_type VARCHAR(20) NOT NULL,
      deal_type VARCHAR(20) NOT NULL,
      room_size DECIMAL(5, 2) NOT NULL,
      floor INT NOT NULL,
      is_elevator BOOLEAN NOT NULL,
      is_parking BOOLEAN NOT NULL,
      has_option BOOLEAN NOT NULL,
      location_id INT NOT NULL,
      price_id INT NOT NULL,
      living_index_id INT NOT NULL,
      deal_status varchar(10) NOT NULL,
      FOREIGN KEY (location_id) REFERENCES location(location_id),
      FOREIGN KEY (price_id) REFERENCES price(price_id) ON DELETE CASCADE,
      FOREIGN KEY (safety_index_id) REFERENCES safety_index(safety_index_id) ON DELETE CASCADE
);