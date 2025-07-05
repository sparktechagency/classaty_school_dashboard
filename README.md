        <Collapse
          accordion
          bordered={false}
          defaultActiveKey={["primary"]}
          style={{ backgroundColor: "#ffffff" }}
        >
          <Panel
            header={
              <MyPanelHeader
                showEditModal={showEditModal}
                title="Primary"
                showDeleteModal={showDeleteModal}
              />
            }
            key="primary"
          >
            <Table
              dataSource={primaryData}
              columns={columns}
              pagination={false}
              size="small"
              rowKey="key"
            />
            <ReuseButton
              onClick={showAddClassModal}
              variant="outline"
              className="!text-secondary-color !mt-5 !w-fit !border-0 !px-1"
            >
              <FiPlus className="!text-base !text-secondary-color" /> Add New
              Class
            </ReuseButton>
          </Panel>

          <Panel
            header={
              <MyPanelHeader
                showEditModal={showEditModal}
                title="Secondary"
                showDeleteModal={showDeleteModal}
              />
            }
            key="secondary"
          >
            {/* Content for Secondary Section */}
            <Typography.Title
              level={4}
              className="!text-secondary-color !text-center"
              type="secondary"
            >
              No classes added yet.
            </Typography.Title>

            <ReuseButton
              onClick={showAddClassModal}
              variant="outline"
              className="!text-secondary-color !mt-5 !w-fit !border-0 !px-1"
            >
              <FiPlus className="!text-base !text-secondary-color" /> Add New
              Class
            </ReuseButton>
          </Panel>

          <Panel
            header={
              <MyPanelHeader
                showEditModal={showEditModal}
                title="Intermediate"
                showDeleteModal={showDeleteModal}
              />
            }
            key="intermediate"
          >
            {/* Content for Intermediate Section */}
            <Typography.Title
              level={4}
              className="!text-secondary-color !text-center"
              type="secondary"
            >
              No classes added yet.
            </Typography.Title>

            <ReuseButton
              onClick={showAddClassModal}
              variant="outline"
              className="!text-secondary-color !mt-5 !w-fit !border-0 !px-1"
            >
              <FiPlus className="!text-base !text-secondary-color" /> Add New
              Class
            </ReuseButton>
          </Panel>
        </Collapse>
