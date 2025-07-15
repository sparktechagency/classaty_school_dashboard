/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfigProvider, Select } from "antd";
import { useState } from "react";

interface UserSelectOptionProps {
  currentUser: string;
  setCurrentUser: (value: string) => void;
}

interface UserSelectOption {
  value: string;
  label: string;
}

const UserSelectOption: React.FC<UserSelectOptionProps> = ({
  currentUser,
  setCurrentUser,
}) => {
  const [usersOptions] = useState<UserSelectOption[]>([
    { value: "parents", label: "Parents" },
    { value: "teacher", label: "Teacher" },
    { value: "student", label: "Student" },
  ]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            colorTextQuaternary: "#F9FAFB",
            fontSize: 16,
            borderRadius: 10,
            colorBorder: "#28314E",
            colorText: "#FFFFFF",
            colorIcon: "#F9FAFB",
            colorBgContainer: "rgba(0,0,0,0)",
            colorBgElevated: "#28314E",
            selectorBg: "#28314E",
            colorTextPlaceholder: "#F9FAFB",
            optionSelectedBg: "#FFFFFF",
            optionSelectedColor: "#28314E",
          },
        },
      }}
    >
      <Select
        value={currentUser}
        style={{ width: 150 }}
        options={usersOptions}
        onChange={(value) => setCurrentUser(value)}
      />
    </ConfigProvider>
  );
};

export default UserSelectOption;
