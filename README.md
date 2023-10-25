# BuildingTextCorpusandSearchApplication
The development of a versatile search application that leverages this corpus, serving as a valuable resource for poets, language enthusiasts, and researchers. The application is designed to cater to specific user needs and enhance the appreciation of metaphorical expressions in these languages.
## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

Make sure you have the following software installed on your machine:

- Elasticsearch (version X.X.X)
- curl (if not already installed)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your/repository.git
2. Run Kibana and elastic search using cmd:
3. Add data to elastic search using the following commands.
   ```sh
   curl -X PUT "localhost:9200/sinhala-metophors?pretty" -H "Content-Type: application/json" -d @mapping_file.json
   curl -X POST "localhost:9200/amazon-reviews/_bulk?pretty" -H "Content-Type: application/json" --data-binary @mini_data_new.json
