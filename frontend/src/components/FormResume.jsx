import React, { useRef, useState } from "react";
import { IoIosReturnRight } from "react-icons/io";
import { ResumeDataSchema } from "../types/zodResume";
import { Fetch } from "../types/Fetch";
function FormResume() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const githubLinkRef = useRef();
  const linkedinLinkRef = useRef();
  const technicalSkillsRef = useRef();
  const aboutMeRef = useRef();
  const workExperienceRef = useRef();

  const [errors, setErrors] = useState({});
  const [projectInputs, setProjectInputs] = useState([{ id: 0 }]);
  const [educationInputs, setEducationInputs] = useState([{ id: 0 }]);

  function addAnotherMultipleInput() {
    setProjectInputs([...projectInputs, { id: projectInputs.length }]);
  }

  function addEducationDetails() {
    setEducationInputs([...educationInputs, { id: educationInputs.length }]);
  }

  const handleSubmit = () => {
    const projects = projectInputs.map((input, index) => {
      const titleRef = document.getElementById(`projectTitle-${index}`);
      const githubLinkRef = document.getElementById(`projectGithub-${index}`);
      const deployedLinkRef = document.getElementById(`deployedLink-${index}`);
      return {
        title: titleRef.value,
        githubLink: githubLinkRef.value,
        deployedLink: deployedLinkRef.value,
      };
    });

    const education = educationInputs.map((input, index) => {
      const academyRef = document.getElementById(`educationAcademy-${index}`);
      const yearRef = document.getElementById(`year-${index}`);
      const institutionRef = document.getElementById(
        `educational_institution-${index}`
      );
      return {
        academy: academyRef.value,
        year: yearRef.value,
        educational_institution: institutionRef.value,
      };
    });

    const formData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      githubLink: githubLinkRef.current.value,
      linkedinLink: linkedinLinkRef.current.value,
      technicalSkills: technicalSkillsRef.current.value.split(","),
      aboutMe: aboutMeRef.current.value,
      projects: projects,
      education: education,
      workExperience: workExperienceRef.current.value.split(","),
    };

    const parsedData = ResumeDataSchema.safeParse(formData);
    if (!parsedData.success) {
      const errorMessages = {};

      parsedData.error.errors.forEach((error) => {
        const pathKey = error.path.join(".");
        errorMessages[pathKey] = error.message;
      });

      setErrors(errorMessages);
      return;
    }

    setErrors({});

  
    const url = "BuildingResume";
    const data = { key: parsedData.data };
    Fetch(url, data);

  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <h1 className="text-4xl mb-6 ">
        Enter the Details: To create the Resume
      </h1>
      <form method="post" className="w-full mb-10 max-w-3xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="mb-1">
              First Name
            </label>
            <input
              ref={firstNameRef}
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              className="px-7 py-2 border rounded text-black "
            />
            {errors["firstName"] && (
              <span className="text-red-500 text-sm">
                {errors["firstName"]}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastName" className="mb-1">
              Last Name
            </label>
            <input
              ref={lastNameRef}
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              className="px-7 py-2 border rounded text-black"
            />
            {errors["lastName"] && (
              <span className="text-red-500 text-sm">{errors["lastName"]}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1">
            Email
          </label>
          <input
            ref={emailRef}
            id="email"
            type="email"
            placeholder="Enter your email"
            className="p-2 border rounded text-black "
          />
          {errors["email"] && (
            <span className="text-red-500 text-sm">{errors["email"]}</span>
          )}
        </div>

        <div className="flex justify-between items-center ">
          <div className="flex flex-col">
            <label htmlFor="githubLink" className="mb-1">
              GitHub Link
            </label>
            <input
              ref={githubLinkRef}
              id="githubLink"
              type="url"
              placeholder="GitHub profile link"
              className="px-7 py-2 border rounded text-black  "
            />
            {errors["githubLink"] && (
              <span className="text-red-500 text-sm">
                {errors["githubLink"]}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="linkedinLink" className="mb-1">
              LinkedIn Link
            </label>
            <input
              ref={linkedinLinkRef}
              id="linkedinLink"
              type="url"
              placeholder="LinkedIn profile link"
              className="px-7 py-2 border rounded text-black "
            />
            {errors["linkedinLink"] && (
              <span className="text-red-500 text-sm">
                {errors["linkedinLink"]}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="technicalSkills" className="mb-1">
            Technical Skills
          </label>
          <input
            ref={technicalSkillsRef}
            id="technicalSkills"
            type="text"
            placeholder="List your technical skills"
            className="p-2 border rounded text-black "
          />
          {errors["technicalSkills"] && (
            <span className="text-red-500 text-sm">
              {errors["technicalSkills"]}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="aboutMe" className="mb-1">
            About Me
          </label>
          <input
            ref={aboutMeRef}
            id="aboutMe"
            type="text"
            placeholder="Write a short bio about yourself"
            className="p-2 border rounded text-black "
          />
          {errors["aboutMe"] && (
            <span className="text-red-500 text-sm">{errors["aboutMe"]}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="projects" className="mb-1">
            Projects
          </label>
          <div className="flex flex-col items-center justify-center gap-10">
            {projectInputs.map((input, index) => (
              <div key={index} className="flex gap-5">
                <input
                  id={`projectTitle-${index}`}
                  type="text"
                  placeholder="Project Title"
                  className="px-7 py-2 border rounded text-black"
                />
                <input
                  id={`projectGithub-${index}`}
                  type="text"
                  placeholder="GitHub Link"
                  className="px-7 py-2 border rounded text-black"
                />
                <input
                  id={`deployedLink-${index}`}
                  type="text"
                  placeholder="Deployed Link"
                  className="px-7 py-2 border rounded text-black"
                />
              </div>
            ))}
            <button
              type="button"
              className="bg-green-400 text-black px-3 rounded-md w-fit mt-2"
              onClick={addAnotherMultipleInput}
            >
              +
            </button>
          </div>
          {errors["projects"] && (
            <span className="text-red-500 text-sm">{errors["projects"]}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="education" className="mb-1">
            Education
          </label>
          <div className="flex flex-col items-center justify-center gap-10">
            {educationInputs.map((input, index) => (
              <div key={index} className="flex gap-5">
                <input
                  id={`educationAcademy-${index}`}
                  type="text"
                  placeholder="Course"
                  className="px-7 py-2 border rounded text-black"
                />
                <input
                  id={`year-${index}`}
                  type="date"
                  placeholder="Year"
                  className="px-7 py-2 border rounded text-black"
                />
                <input
                  id={`educational_institution-${index}`}
                  type="text"
                  placeholder="Educational Institute"
                  className="px-7 py-2 border rounded text-black"
                />
              </div>
            ))}
            <button
              type="button"
              className="bg-green-400 text-black px-3 rounded-md w-fit mt-2"
              onClick={addEducationDetails}
            >
              +
            </button>
          </div>
          {errors["education"] && (
            <span className="text-red-500 text-sm">{errors["education"]}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="workExperience" className="mb-1">
            Work Experience
          </label>
          <input
            ref={workExperienceRef}
            id="workExperience"
            type="text"
            placeholder="List your work experience"
            className="p-2 border rounded text-black "
          />
          {errors["workExperience"] && (
            <span className="text-red-500 text-sm">
              {errors["workExperience"]}
            </span>
          )}
        </div>
      </form>
      <div
        id="submitBtn"
        onClick={handleSubmit}
        className="w-44 px-4 py-2 flex items-center justify-between bg-zinc-100 rounded-full hover:scale-105 hover:duration-150 text-black cursor-pointer"
      >
        <span className="text-sm ">Create </span>
        <IoIosReturnRight />
      </div>
    </div>
  );
}

export default FormResume;
