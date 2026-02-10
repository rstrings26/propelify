-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.attempts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  paper_id uuid,
  question_number text,
  topical_topic_id uuid,
  answer_text text,
  upload_bucket text DEFAULT 'attempt-uploads'::text,
  upload_path text,
  status USER-DEFINED NOT NULL DEFAULT 'draft'::attempt_status,
  self_check USER-DEFINED NOT NULL DEFAULT 'unknown'::self_check_status,
  student_note text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT attempts_pkey PRIMARY KEY (id),
  CONSTRAINT attempts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  CONSTRAINT attempts_paper_id_fkey FOREIGN KEY (paper_id) REFERENCES public.papers(id),
  CONSTRAINT attempts_topical_topic_id_fkey FOREIGN KEY (topical_topic_id) REFERENCES public.topics(id)
);
CREATE TABLE public.bookmarks (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  btype USER-DEFINED NOT NULL,
  paper_id uuid,
  topic_id uuid,
  question_ref text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT bookmarks_pkey PRIMARY KEY (id),
  CONSTRAINT bookmarks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  CONSTRAINT bookmarks_paper_id_fkey FOREIGN KEY (paper_id) REFERENCES public.papers(id),
  CONSTRAINT bookmarks_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topics(id)
);
CREATE TABLE public.paper_files (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  paper_id uuid NOT NULL,
  file_type USER-DEFINED NOT NULL,
  storage_bucket text NOT NULL DEFAULT 'content'::text,
  storage_path text NOT NULL,
  google_drive_file_id text,
  google_drive_view_link text,
  google_drive_download_link text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT paper_files_pkey PRIMARY KEY (id),
  CONSTRAINT paper_files_paper_id_fkey FOREIGN KEY (paper_id) REFERENCES public.papers(id)
);
CREATE TABLE public.papers (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  subject_id uuid NOT NULL,
  year integer NOT NULL,
  session USER-DEFINED NOT NULL,
  paper text NOT NULL,
  variant text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT papers_pkey PRIMARY KEY (id),
  CONSTRAINT papers_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subjects(id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  full_name text NOT NULL DEFAULT ''::text,
  role USER-DEFINED NOT NULL DEFAULT 'student'::user_role,
  level text NOT NULL DEFAULT 'O Level'::text,
  selected_subjects ARRAY NOT NULL DEFAULT '{}'::text[],
  target_exam_session text,
  region_school text,
  onboarding_complete boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.subjects (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  level text NOT NULL DEFAULT 'O Level'::text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT subjects_pkey PRIMARY KEY (id)
);
CREATE TABLE public.subscriptions (
  user_id uuid NOT NULL,
  plan USER-DEFINED NOT NULL DEFAULT 'free'::plan_tier,
  status text NOT NULL DEFAULT 'active'::text,
  renewal_date timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT subscriptions_pkey PRIMARY KEY (user_id),
  CONSTRAINT subscriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.syllabus_files (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  subject_id uuid NOT NULL,
  file_type USER-DEFINED NOT NULL,
  title text NOT NULL DEFAULT ''::text,
  year integer,
  storage_bucket text NOT NULL DEFAULT 'content'::text,
  storage_path text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT syllabus_files_pkey PRIMARY KEY (id),
  CONSTRAINT syllabus_files_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subjects(id)
);
CREATE TABLE public.topics (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  subject_id uuid NOT NULL,
  name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT topics_pkey PRIMARY KEY (id),
  CONSTRAINT topics_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subjects(id)
);