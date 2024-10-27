class Badge:
    def __init__(self, name, description, icon_path, criteria):
        self.name = name
        self.description = description
        self.icon_path = icon_path
        self.criteria = criteria

    def to_dict(self):
        return {
            'name': self.name,
            'description': self.description,
            'icon_path': self.icon_path,
            'criteria': self.criteria
        }
