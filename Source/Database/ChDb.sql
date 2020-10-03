--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

-- Started on 2020-09-20 22:48:03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 217 (class 1255 OID 16528)
-- Name: AddUser(text, text, text, text, integer, text, text); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public."AddUser"(_firstname text, _lastname text, _address text, _city text, _zipcode integer, _phone text, _email text)
    LANGUAGE sql
    AS $$ 

INSERT INTO public."Users"("firstname", "lastname", "address", "city", "zipcode", "phone", "email")
	SELECT _firstname, _lastname, _address, _city, _zipcode, _phone, _email
	where not exists (SELECT * FROM public."Users" where "email" = _email);

$$;


ALTER PROCEDURE public."AddUser"(_firstname text, _lastname text, _address text, _city text, _zipcode integer, _phone text, _email text) OWNER TO postgres;

--
-- TOC entry 218 (class 1255 OID 16472)
-- Name: CheckInUser(text); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public."CheckInUser"(_email text)
    LANGUAGE sql
    AS $$ 

Insert INTO public."CheckIn"("checkin", "email") Select CURRENT_TIMESTAMP, _email 
 where not exists (SELECT 1 FROM public."CheckIn" where "email" = _email INTERSECT
	 SELECT 1 FROM public."CheckIn" where EXTRACT(YEAR from "checkin") = EXTRACT(YEAR from CURRENT_TIMESTAMP))

$$;


ALTER PROCEDURE public."CheckInUser"(_email text) OWNER TO postgres;

--
-- TOC entry 220 (class 1255 OID 16547)
-- Name: DeleteUser(text); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public."DeleteUser"(_email text)
    LANGUAGE sql
    AS $$ DELETE FROM public."Users" WHERE "email"=_email$$;


ALTER PROCEDURE public."DeleteUser"(_email text) OWNER TO postgres;

--
-- TOC entry 216 (class 1255 OID 16540)
-- Name: FindUser(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public."FindUser"(_name text) RETURNS TABLE(firstname text, lastname text, address text, city text, zipcode integer, phone text, email text, checkin date)
    LANGUAGE sql
    AS $$

SELECT public."Users"."firstname", public."Users"."lastname", public."Users"."address", public."Users"."city", 
public."Users"."zipcode" , public."Users"."phone", public."Users"."email", MAX(public."CheckIn"."checkin") 
AS "checkin" FROM public."Users" NATURAL LEFT JOIN public."CheckIn" 
WHERE LOWER(public."Users"."firstname") LIKE LOWER(CONCAT(_name,'%'))
OR LOWER(public."Users"."lastname") LIKE LOWER(CONCAT(_name,'%')) GROUP BY "firstname", "lastname", "email"

$$;


ALTER FUNCTION public."FindUser"(_name text) OWNER TO postgres;

--
-- TOC entry 219 (class 1255 OID 16542)
-- Name: UpdateUser(text, text, text, text, integer, text, text, text); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public."UpdateUser"(_firstname text, _lastname text, _address text, _city text, _zipcode integer, _phone text, _newemail text, _oldemail text)
    LANGUAGE sql
    AS $$ 

UPDATE public."Users" SET "firstname"=_firstname, "lastname"=_lastname,"address"=_address, 
	"city"=_city,"zipcode"=_zipcode,"phone"=_phone, "email"=_newemail
	WHERE "email"=_oldemail

$$;


ALTER PROCEDURE public."UpdateUser"(_firstname text, _lastname text, _address text, _city text, _zipcode integer, _phone text, _newemail text, _oldemail text) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 16548)
-- Name: CheckIn; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CheckIn" (
    "checkin" date NOT NULL,
    "email" text NOT NULL
);


ALTER TABLE public."CheckIn" OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16453)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    "firstname" text NOT NULL,
    "lastname" text NOT NULL,
    "address" text,
    "city" text,
    "zipcode" integer,
    "phone" text,
    "email" text NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- TOC entry 2826 (class 0 OID 16548)
-- Dependencies: 203
-- Data for Name: CheckIn; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CheckIn" ("checkin", "email") FROM stdin;
2020-09-18	renitajose@hotmail.com
2020-09-18	josewilson@hotmail.com
2020-09-19	renitajose@gmail.com
2020-09-18	mmichelle238@gmail.com
\.


--
-- TOC entry 2825 (class 0 OID 16453)
-- Dependencies: 202
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" ("firstname", "lastname", "address", "city", "zipcode", "phone", "email") FROM stdin;
Ethan	Morris	2304 195th PL SE	Bothell	98012	425-345-6789	ethanmorris@gmail.com
Jose	Wilson	2304 195th PL SE	Bothell	98012	425-445-1662	josewilson@hotmail.com
Renita	Arulnathan	2304 195th PL SE	Bothell	98012	425-445-7674	renitajose@hotmail.com
Renita	Arulnathan	2304 195th PL SE	Bothell	98012	425-445-7674	renitajose@gmail.com
Michelle	Morris	2304 195th PL SE	Bothell	98012	425-215-2551	mmichelle238@gmail.com
\.


--
-- TOC entry 2697 (class 2606 OID 16460)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("email");


--
-- TOC entry 2698 (class 2606 OID 16554)
-- Name: CheckIn fk_email; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CheckIn"
    ADD CONSTRAINT fk_email FOREIGN KEY ("email") REFERENCES public."Users"("email") ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2020-09-20 22:48:04

--
-- PostgreSQL database dump complete
--

