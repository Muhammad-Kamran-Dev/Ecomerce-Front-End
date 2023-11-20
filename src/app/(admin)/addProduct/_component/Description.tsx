"use client";
import { SetStateAction, useState } from "react";
import { TagsInput } from "react-tag-input-component";

type DescriptionProps = {
  description: string[];
  setDescription: React.Dispatch<SetStateAction<string[]>>;
  isDescriptionEmpty: boolean;
  setIsDescriptionEmpty: React.Dispatch<SetStateAction<boolean>>;
};

const Description = ({
  description,
  setDescription,
  isDescriptionEmpty,
  setIsDescriptionEmpty,
}: DescriptionProps) => {
  const [exist, setExist] = useState<boolean>(false);

  const handleOnExisting = () => {
    setExist(true);
  };

  const handleChange = (tags: string[]) => {
    setExist(false);
    setIsDescriptionEmpty(false);
    setDescription(tags);
  };

  return (
    <div>
      <label htmlFor="description" className="mb-2">
        Description
      </label>
      <TagsInput
        value={description}
        onChange={handleChange}
        name="description"
        placeHolder="Enter Description"
        onExisting={handleOnExisting}
      />
      <div className="flex flex-col gap">
        {exist || isDescriptionEmpty ? (
          <em className="block text-red-500 font-semibold text-sm my-2">
            {exist ? "Tag already exists" : "Description cannot be empty"}
          </em>
        ) : (
          <em className="my-2">Press enter or comma to add new tag</em>
        )}
      </div>
    </div>
  );
};

export default Description;
