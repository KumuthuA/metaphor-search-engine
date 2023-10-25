# BuildingTextCorpusandSearchApplication
The objective of the Sinhala Metaphor Search Engine is to provide a valuable resource for poets, writers, students, and language enthusiasts who want to explore and understand metaphors in Sinhala literature and creative works. It will enable users to search, explore, and analyse Sinhala metaphors based on various attributes.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

Make sure you have the following software installed on your machine:

- Elasticsearch 
- curl 

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your/repository.git
2. Run Kibana and elastic search using cmd:
3. Add data to elastic search using the following commands.
   ```sh
   curl -X PUT "localhost:9200/sinhala-metophors?pretty" -H "Content-Type: application/json" -d @mapping_file.json
   curl -X POST "localhost:9200/amazon-reviews/_bulk?pretty" -H "Content-Type: application/json" --data-binary @mini_data_new.json
