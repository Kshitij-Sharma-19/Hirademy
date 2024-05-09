PGDMP                  	        |         	   Myproject    15.4    15.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                        1262    16398 	   Myproject    DATABASE     �   CREATE DATABASE "Myproject" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "Myproject";
                postgres    false                       0    0    DATABASE "Myproject"    COMMENT     :   COMMENT ON DATABASE "Myproject" IS '#Backend Assignment';
                   postgres    false    3328            �            1255    16419    set_assistant_id()    FUNCTION     �   CREATE FUNCTION public.set_assistant_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.id := (SELECT COALESCE(MAX(id), 0) + 1 FROM assistants);
    RETURN NEW;
END;
$$;
 )   DROP FUNCTION public.set_assistant_id();
       public          postgres    false            �            1255    16415    update_assistant_id()    FUNCTION       CREATE FUNCTION public.update_assistant_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        DELETE FROM assistants WHERE id = OLD.id;
        UPDATE assistants SET id = id - 1 WHERE id > OLD.id;
    END IF;
    RETURN OLD;
END;
$$;
 ,   DROP FUNCTION public.update_assistant_id();
       public          postgres    false            �            1259    16403 
   assistants    TABLE     6  CREATE TABLE public.assistants (
    id integer NOT NULL,
    name character varying(100),
    mobile character varying(20),
    email character varying(100),
    salary numeric(15,2),
    city character varying(100),
    country character varying(100),
    department character varying(100),
    role text
);
    DROP TABLE public.assistants;
       public         heap    postgres    false            �            1259    16402    assistant_id_seq    SEQUENCE     �   CREATE SEQUENCE public.assistant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.assistant_id_seq;
       public          postgres    false    215                       0    0    assistant_id_seq    SEQUENCE OWNED BY     F   ALTER SEQUENCE public.assistant_id_seq OWNED BY public.assistants.id;
          public          postgres    false    214            g           2604    16406    assistants id    DEFAULT     m   ALTER TABLE ONLY public.assistants ALTER COLUMN id SET DEFAULT nextval('public.assistant_id_seq'::regclass);
 <   ALTER TABLE public.assistants ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            �          0    16403 
   assistants 
   TABLE DATA           f   COPY public.assistants (id, name, mobile, email, salary, city, country, department, role) FROM stdin;
    public          postgres    false    215                     0    0    assistant_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.assistant_id_seq', 36, true);
          public          postgres    false    214            i           2606    16410    assistants assistant_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.assistants
    ADD CONSTRAINT assistant_pkey PRIMARY KEY (id);
 C   ALTER TABLE ONLY public.assistants DROP CONSTRAINT assistant_pkey;
       public            postgres    false    215            j           2620    16420 #   assistants insert_assistant_trigger    TRIGGER     �   CREATE TRIGGER insert_assistant_trigger BEFORE INSERT ON public.assistants FOR EACH ROW EXECUTE FUNCTION public.set_assistant_id();
 <   DROP TRIGGER insert_assistant_trigger ON public.assistants;
       public          postgres    false    215    217            �   �   x�}α�0����aH)�m�4q���r��V(�>�58`b�?|99l{�rQHTڔ�$��%���@ �簳��P��'��4�v�nvf�����Q(r�K��/):�T+���D?E	u����
�6(a��X��|aZG��(�j钌"1���H����/s�c/VUu     