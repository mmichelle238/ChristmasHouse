--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

-- Started on 2020-07-14 22:39:56

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
-- TOC entry 204 (class 1255 OID 16472)
-- Name: CheckInUser(text); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public."CheckInUser"(_email text)
    LANGUAGE sql
    AS $$ 
Insert INTO public."CheckIn"("CheckIn", "Email") Select CURRENT_TIMESTAMP, _email 
 where not exists (SELECT 1 FROM public."CheckIn" where EXTRACT(YEAR from "CheckIn") = EXTRACT(YEAR from CURRENT_TIMESTAMP))

$$;


ALTER PROCEDURE public."CheckInUser"(_email text) OWNER TO postgres;

--
-- TOC entry 217 (class 1255 OID 16505)
-- Name: FindUser(text); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public."FindUser"(_name text)
    LANGUAGE sql
    AS $$

SELECT public."Users"."FirstName", public."Users"."LastName", public."Users"."Email", public."CheckIn"."CheckIn"
FROM public."Users"
INNER JOIN public."CheckIn" ON public."Users"."Email"=public."CheckIn"."Email"
WHERE LOWER(public."Users"."FirstName") LIKE LOWER(CONCAT(_name,'%'))
OR LOWER(public."Users"."LastName") LIKE LOWER(CONCAT(_name,'%'));

$$;


ALTER PROCEDURE public."FindUser"(_name text) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 16461)
-- Name: CheckIn; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CheckIn" (
    "CheckIn" date NOT NULL,
    "Email" text NOT NULL
);


ALTER TABLE public."CheckIn" OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16453)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    "FirstName" text NOT NULL,
    "LastName" text NOT NULL,
    "Address" text,
    "City" text,
    "ZipCode" integer,
    "Phone" text,
    "Email" text NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- TOC entry 2823 (class 0 OID 16461)
-- Dependencies: 203
-- Data for Name: CheckIn; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CheckIn" ("CheckIn", "Email") FROM stdin;
2020-06-21	mmichelle238@gmail.com
\.


--
-- TOC entry 2822 (class 0 OID 16453)
-- Dependencies: 202
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" ("FirstName", "LastName", "Address", "City", "ZipCode", "Phone", "Email") FROM stdin;
Michelle	Morris	2304 195th PL SE	Bothell	98012	425-215-2551	mmichelle238@gmail.com
\.


--
-- TOC entry 2694 (class 2606 OID 16460)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("Email");


--
-- TOC entry 2695 (class 2606 OID 16467)
-- Name: CheckIn fk_email; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CheckIn"
    ADD CONSTRAINT fk_email FOREIGN KEY ("Email") REFERENCES public."Users"("Email");


-- Completed on 2020-07-14 22:39:56

--
-- PostgreSQL database dump complete
--

