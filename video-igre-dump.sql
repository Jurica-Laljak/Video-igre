--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2024-11-10 18:13:33

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16641)
-- Name: dlcs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dlcs (
    id integer NOT NULL,
    dlc_name character varying(60),
    dlc_release_date date,
    dlc_price real,
    id_game integer
);


ALTER TABLE public.dlcs OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16644)
-- Name: dlcs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.dlcs ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.dlcs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 219 (class 1259 OID 16645)
-- Name: games; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.games (
    id integer NOT NULL,
    name character varying(60),
    release_date date,
    developer character varying(60),
    publisher character varying(60),
    genre character varying(60),
    price real,
    metascore integer,
    has_singleplayer boolean,
    has_multiplayer boolean
);


ALTER TABLE public.games OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16648)
-- Name: games_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.games ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.games_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 16649)
-- Name: platforms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.platforms (
    id integer NOT NULL,
    platform character varying(60),
    id_game integer
);


ALTER TABLE public.platforms OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16652)
-- Name: platforms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.platforms ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.platforms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4858 (class 0 OID 16641)
-- Dependencies: 217
-- Data for Name: dlcs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dlcs (id, dlc_name, dlc_release_date, dlc_price, id_game) FROM stdin;
1	Digital Deluxe Edition	2023-08-03	9.75	1
2	Original Soundtrack	2023-02-01	9.75	2
3	The Mercenaries	2023-04-07	0	3
4	Separate Ways	2023-09-21	9.99	3
5	Original Soundtrack	2023-09-21	24.99	3
6	Original Soundtrack	2023-08-18	9.75	5
7	Blackstone Key	2023-03-30	4.99	8
8	The Pale Reach	2023-11-16	5.99	8
9	Original Soundtrack	2023-10-17	10.99	11
10	Digital Artbook	2023-11-02	4.99	12
11	Original Soundtrack	2023-12-21	9.75	12
12	Year 1 Character Pass	2023-06-01	29.99	13
13	Year 1 Ultimate Pass	2023-06-01	49.99	13
14	Original Soundtrack	2023-07-28	69.99	13
\.


--
-- TOC entry 4860 (class 0 OID 16645)
-- Dependencies: 219
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.games (id, name, release_date, developer, publisher, genre, price, metascore, has_singleplayer, has_multiplayer) FROM stdin;
1	Baldur's Gate	2023-08-03	Larian Studios	Larian Studios	RPG	59.99	96	t	t
2	Pizza Tower	2023-01-26	Tour De Pizza	Tour De Pizza	Platformer	19.5	89	t	f
3	Resident Evil 4	2023-03-24	Capcom	Capcom	Horror	39.99	93	t	f
4	Honkai: Star Rail	2023-04-26	miHoyo	HoYoverse	RPG	0	80	t	f
5	Turbo Overkill	2023-08-11	Trigger Happy Interactive	Apogee Entertainment	FPS	24.5	87	t	f
6	The Legend of Zelda: Tears of the Kingdom	2023-05-12	Nintendo EDP	Nintendo	Adventure	69.99	96	t	f
7	ARMORED CORE VI FIRES OF RUBICON	2023-08-25	FromSoftware	FromSoftware	Action	59.99	86	t	f
8	DREDGE	2023-03-30	Black Salt Games	Team17	Adventure	24.99	80	t	f
9	Cities: Skylines II	2023-10-24	Colossal Order Ltd.	Paradox Interactive	City Builder	49.99	74	t	f
10	Barotrauma	2023-03-13	FakeFish	Daedalic Entertainment	Horror	24.99	81	t	t
11	Diablo IV	2023-10-17	Blizzard Etertainment	Blizzard Etertainment	RPG	49.99	86	t	t
12	The Talos Principle 2	2023-11-02	Croteam	Devolver Digital	Puzzle	28.99	88	t	f
13	Street Fighter 6	2023-06-01	Capcom	Capcom	Action	59.99	92	t	t
\.


--
-- TOC entry 4862 (class 0 OID 16649)
-- Dependencies: 221
-- Data for Name: platforms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.platforms (id, platform, id_game) FROM stdin;
1	PC	1
2	PlayStation 5	1
3	Xbox Series X	1
4	PC	2
5	Nintendo Switch	2
6	PC	3
7	PlayStation 5	3
8	Xbox Series X	3
9	PC	4
10	PlayStation 5	4
11	Mobile	4
12	PC	5
13	Nintendo Switch	6
14	PC	7
15	PlayStation 5	7
16	Xbox Series X	7
17	PC	8
18	PlayStation 5	8
19	Xbox Series X	8
20	Nintendo Switch	8
21	Mobile	8
22	PC	9
23	PC	10
24	PC	11
25	PlayStation 5	11
26	Xbox Series X	11
27	PC	12
28	PlayStation 5	12
29	Xbox Series X	12
30	PC	13
31	PlayStation 5	13
32	Xbox Series X	13
\.


--
-- TOC entry 4869 (class 0 OID 0)
-- Dependencies: 218
-- Name: dlcs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dlcs_id_seq', 14, true);


--
-- TOC entry 4870 (class 0 OID 0)
-- Dependencies: 220
-- Name: games_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.games_id_seq', 13, true);


--
-- TOC entry 4871 (class 0 OID 0)
-- Dependencies: 222
-- Name: platforms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.platforms_id_seq', 32, true);


--
-- TOC entry 4706 (class 2606 OID 16654)
-- Name: dlcs dlcs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dlcs
    ADD CONSTRAINT dlcs_pkey PRIMARY KEY (id);


--
-- TOC entry 4708 (class 2606 OID 16656)
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);


--
-- TOC entry 4710 (class 2606 OID 16658)
-- Name: platforms platforms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.platforms
    ADD CONSTRAINT platforms_pkey PRIMARY KEY (id);


--
-- TOC entry 4711 (class 2606 OID 16659)
-- Name: dlcs dlcs_id_game_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dlcs
    ADD CONSTRAINT dlcs_id_game_fkey FOREIGN KEY (id_game) REFERENCES public.games(id);


--
-- TOC entry 4712 (class 2606 OID 16664)
-- Name: platforms platforms_id_game_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.platforms
    ADD CONSTRAINT platforms_id_game_fkey FOREIGN KEY (id_game) REFERENCES public.games(id);


-- Completed on 2024-11-10 18:13:33

--
-- PostgreSQL database dump complete
--

