PGDMP                         {            medilogportal    15.2    15.2 (    '           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            (           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            )           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            *           1262    16484    medilogportal    DATABASE     �   CREATE DATABASE medilogportal WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';
    DROP DATABASE medilogportal;
                postgres    false            �            1259    19090    hospital    TABLE     8  CREATE TABLE public.hospital (
    id_usuario bigint NOT NULL,
    nombre character varying(50) NOT NULL,
    direccion character varying(100) NOT NULL,
    servicios_medicos character varying(400) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.hospital;
       public         heap    postgres    false            �            1259    19101    medico    TABLE     �  CREATE TABLE public.medico (
    id bigint NOT NULL,
    nombre character varying(50) NOT NULL,
    primer_apellido character varying(50) NOT NULL,
    segundo_apellido character varying(50) NOT NULL,
    direccion character varying(100) NOT NULL,
    especialidad character varying(100) NOT NULL,
    primer_inicio_sesion boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    id_usuario bigint NOT NULL,
    id_hospital bigint NOT NULL
);
    DROP TABLE public.medico;
       public         heap    postgres    false            �            1259    19100    medico_id_seq    SEQUENCE     v   CREATE SEQUENCE public.medico_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.medico_id_seq;
       public          postgres    false    219            +           0    0    medico_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.medico_id_seq OWNED BY public.medico.id;
          public          postgres    false    218            �            1259    19118    observacion_medica    TABLE     |  CREATE TABLE public.observacion_medica (
    id bigint NOT NULL,
    fecha_observacion timestamp with time zone NOT NULL,
    detalle_observacion character varying(800) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    id_paciente bigint NOT NULL,
    id_hospital bigint NOT NULL,
    id_medico bigint NOT NULL
);
 &   DROP TABLE public.observacion_medica;
       public         heap    postgres    false            �            1259    19117    observacion_medica_id_seq    SEQUENCE     �   CREATE SEQUENCE public.observacion_medica_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.observacion_medica_id_seq;
       public          postgres    false    221            ,           0    0    observacion_medica_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.observacion_medica_id_seq OWNED BY public.observacion_medica.id;
          public          postgres    false    220            �            1259    19080    paciente    TABLE     �  CREATE TABLE public.paciente (
    id_usuario bigint NOT NULL,
    nombre character varying(50) NOT NULL,
    primer_apellido character varying(50) NOT NULL,
    segundo_apellido character varying(50) NOT NULL,
    direccion character varying(100) NOT NULL,
    fecha_nacimiento date NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.paciente;
       public         heap    postgres    false            �            1259    19070    usuario    TABLE     �  CREATE TABLE public.usuario (
    id bigint NOT NULL,
    identificacion character varying(20) NOT NULL,
    email character varying(50) NOT NULL,
    telefono character varying(20) NOT NULL,
    contrasena character varying(100) NOT NULL,
    codigo_uuid character varying(50) NOT NULL,
    confirmacion_registro boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    19069    usuario_id_seq    SEQUENCE     w   CREATE SEQUENCE public.usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.usuario_id_seq;
       public          postgres    false    215            -           0    0    usuario_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;
          public          postgres    false    214            x           2604    19104 	   medico id    DEFAULT     f   ALTER TABLE ONLY public.medico ALTER COLUMN id SET DEFAULT nextval('public.medico_id_seq'::regclass);
 8   ALTER TABLE public.medico ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            y           2604    19121    observacion_medica id    DEFAULT     ~   ALTER TABLE ONLY public.observacion_medica ALTER COLUMN id SET DEFAULT nextval('public.observacion_medica_id_seq'::regclass);
 D   ALTER TABLE public.observacion_medica ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            w           2604    19073 
   usuario id    DEFAULT     h   ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);
 9   ALTER TABLE public.usuario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215                       0    19090    hospital 
   TABLE DATA           n   COPY public.hospital (id_usuario, nombre, direccion, servicios_medicos, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    217   6       "          0    19101    medico 
   TABLE DATA           �   COPY public.medico (id, nombre, primer_apellido, segundo_apellido, direccion, especialidad, primer_inicio_sesion, "createdAt", "updatedAt", id_usuario, id_hospital) FROM stdin;
    public          postgres    false    219   7       $          0    19118    observacion_medica 
   TABLE DATA           �   COPY public.observacion_medica (id, fecha_observacion, detalle_observacion, "createdAt", "updatedAt", id_paciente, id_hospital, id_medico) FROM stdin;
    public          postgres    false    221   8                 0    19080    paciente 
   TABLE DATA           �   COPY public.paciente (id_usuario, nombre, primer_apellido, segundo_apellido, direccion, fecha_nacimiento, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   �;                 0    19070    usuario 
   TABLE DATA           �   COPY public.usuario (id, identificacion, email, telefono, contrasena, codigo_uuid, confirmacion_registro, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215   ><       .           0    0    medico_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.medico_id_seq', 3, true);
          public          postgres    false    218            /           0    0    observacion_medica_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.observacion_medica_id_seq', 4, true);
          public          postgres    false    220            0           0    0    usuario_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.usuario_id_seq', 7, true);
          public          postgres    false    214            �           2606    19094    hospital hospital_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.hospital
    ADD CONSTRAINT hospital_pkey PRIMARY KEY (id_usuario);
 @   ALTER TABLE ONLY public.hospital DROP CONSTRAINT hospital_pkey;
       public            postgres    false    217            �           2606    19106    medico medico_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.medico
    ADD CONSTRAINT medico_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.medico DROP CONSTRAINT medico_pkey;
       public            postgres    false    219            �           2606    19123 *   observacion_medica observacion_medica_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.observacion_medica
    ADD CONSTRAINT observacion_medica_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.observacion_medica DROP CONSTRAINT observacion_medica_pkey;
       public            postgres    false    221            �           2606    19084    paciente paciente_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT paciente_pkey PRIMARY KEY (id_usuario);
 @   ALTER TABLE ONLY public.paciente DROP CONSTRAINT paciente_pkey;
       public            postgres    false    216            {           2606    19079    usuario usuario_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_key UNIQUE (email);
 C   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_key;
       public            postgres    false    215            }           2606    19077 "   usuario usuario_identificacion_key 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_identificacion_key UNIQUE (identificacion);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_identificacion_key;
       public            postgres    false    215                       2606    19075    usuario usuario_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    215            �           2606    19095 !   hospital hospital_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hospital
    ADD CONSTRAINT hospital_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id) ON UPDATE CASCADE ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.hospital DROP CONSTRAINT hospital_id_usuario_fkey;
       public          postgres    false    3199    217    215            �           2606    19112    medico medico_id_hospital_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.medico
    ADD CONSTRAINT medico_id_hospital_fkey FOREIGN KEY (id_hospital) REFERENCES public.hospital(id_usuario) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.medico DROP CONSTRAINT medico_id_hospital_fkey;
       public          postgres    false    217    219    3203            �           2606    19107    medico medico_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.medico
    ADD CONSTRAINT medico_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id) ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.medico DROP CONSTRAINT medico_id_usuario_fkey;
       public          postgres    false    3199    215    219            �           2606    19129 6   observacion_medica observacion_medica_id_hospital_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.observacion_medica
    ADD CONSTRAINT observacion_medica_id_hospital_fkey FOREIGN KEY (id_hospital) REFERENCES public.hospital(id_usuario) ON UPDATE CASCADE ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.observacion_medica DROP CONSTRAINT observacion_medica_id_hospital_fkey;
       public          postgres    false    3203    217    221            �           2606    19134 4   observacion_medica observacion_medica_id_medico_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.observacion_medica
    ADD CONSTRAINT observacion_medica_id_medico_fkey FOREIGN KEY (id_medico) REFERENCES public.medico(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.observacion_medica DROP CONSTRAINT observacion_medica_id_medico_fkey;
       public          postgres    false    3205    221    219            �           2606    19124 6   observacion_medica observacion_medica_id_paciente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.observacion_medica
    ADD CONSTRAINT observacion_medica_id_paciente_fkey FOREIGN KEY (id_paciente) REFERENCES public.paciente(id_usuario) ON UPDATE CASCADE ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.observacion_medica DROP CONSTRAINT observacion_medica_id_paciente_fkey;
       public          postgres    false    221    216    3201            �           2606    19085 !   paciente paciente_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT paciente_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id) ON UPDATE CASCADE ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.paciente DROP CONSTRAINT paciente_id_usuario_fkey;
       public          postgres    false    215    3199    216                �   x��P9N�0��S|�6��d<J��	�P��,9�`;G����f
�ʷHo�:������5��\9���&��^PՓCFo���aB����u��u��4�v-q�:�µR�m���֣	.�'��8ي<����-<�b�Y�9�JN��kMZ�ש��Z�&$e��=>r1�}�؎��R��o܅�"��8g�AP�����6�k� \��0J�	����&5�]�4�2�N      "   �   x�}�=N�0��zr
KԎf��� �EBHh�����:�7��S��p��SP��<������������$��������cLC�,v1��A���$'��D��h�C/��@���֤A5
�9g������pJ����*js-=<�1�R.����1h�k;��ڊ�@��m�����8ƒ�����3��ч¢�+�4��� P�Z���&�krzK��m��U      $   �  x��U�r�8�����5$%%�K����kV䊁��D��.R���?voAJ���3�	������|Qd��&�o���d�vw���-u\q�P$����>��yE��>P-�phX�O��HQ*^�_�a|�z [��I�l �O���6���7��p�|��W����G��B����M`����5��yf�ߵtzn����� ��/�q�?pxP�=[˵��Lk������K�����&��|[n�e�]�6[U읭|Q,�e�|dG٧�(���Z��^l9)x]��*�މ�xK.�u���`��j���,��.��3+�wlx����V�ɟ�I�	E�V���H��؄��	}[�Ȉ�JB��O�L��("���=J���/�DY�*�v�]^�2��-5�Xn.G2����Ia�;��B^r-��Zn�� ����%����UIF��%P:	&�X�}�ƕ�TƇ������W_=��AT'㌺�+X���5ݝC��f|t�Ƈ!
���hߩ�.Ω�cjP�x�A4��Դ��iG~t(w���D@��}�p�Y�ʳ�|t��L��4�>L�l�V�)g���!A���/�0It���J�)Ī8rZ��X7<�B!pS,����`�@+��%\��y��cYܖy�.�.{gk����,��ZxS�rJ�%i�����-�i�d�B�΅�&B��ℝ:O~��1@^�'a�����2u�>dW��7�k{Ӧ�j"�x~=�WK_�"A
_�������:O2�+�O�t���yж|Ҽ�� ������(܋Fln���𼈌"�_��*�<�V��֠׆�X��w*���Ӵ��!����wujV "����oŵ�Z�;������m�r�4�^ϡ��C��z�\�o��Q         �   x�}ͽ
�0@���)η���d�����1�Ҵ�����MDp>p>�Cz�78���_u��<��[�`X�d%w�d#R ��Ae��$-G2�����I��i��q߈��kZGh�2��R$9�ʶ��G-o�ר*�L�$�:D͍����I��!�p=3�         h  x�m��r�8����VFGwy5�� !�%tR��d�6N�����f��U�W�9�@`��*J�[�Ƴj9ۼ���/���e�W&_F�kF9p"�[bn�>,ͩT�r9����t]���W��l0�;<�j\�N��k�թ?���`,��hn��(�SZ k5F\��#)Ui��&a�@~�0� ����H%�%\��ݐ(H�3E�ܙ9����2���ϧ�����C�u蟏�5o�'���i_'�}�p:�f�z�����*6�
	1�i"R4SY�d4�!� I�r!4!,�*�L�!4�?���[S�s��S]q��b~r�O���xЮ����ޏ&%-�V��9�b��N��y�>zeG�aEw�2�" b)7�0�P��q�u�p� |�/�%a$� �A��Es�^����3��]�4�q6�o��|�<^��z�-�V�a���;h���i����E�/R&DQ�2�ĥ(t��o%5B��C)	�1e��#b8��~�E����u���<.6�_[S��W�k�Cٿ&m�]�F�����M�U�6��d`;��↤jQ����I�~�n���(J
l-��I�H�]ʂ�ޥ`�g��脈�����ABp�ccD��\��u$f�$�C&��_C���]f�������\�|����w܅�K�Y��E�K۫�F9x��fQE�%Ɔ���Rd�b�p�q&��$L'�� /�	���Gt#Ð�s��̧���&����Kr��^ο�75z�b5�+OǼ^/�5�j��*����s+����tz�]��VۢW�F[��T#�|��2R ����d���\�d�i�E���$�tx�b->H��777�|Z     