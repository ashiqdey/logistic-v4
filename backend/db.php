<?php
class DB {
	public function __construct() {
		$mysqli = new mysqli("localhost",DB_USER,DB_PASS,DB_NAME);
		if ($mysqli -> connect_errno) {
			die("Failed to connect to MySQL: " . $mysqli -> connect_error);
		}
		$this->db_conn = $mysqli;
	}
	public function close() {
		$this->db_conn->close();
	}
	public function escape($d) {
		return mysqli_real_escape_string($this->db_conn,$d);
	}

	public function delete($table,$where) {
		return ($this->db_conn->query("DELETE FROM {$table} WHERE {$where}") === TRUE)?1:0;
	}


	public function select($col,$table,$where,$single=0) {
		return $this->selectDB("SELECT {$col} FROM {$table} WHERE {$where}",$single);
	}


	public function selectNoWhere($col,$table,$where,$single=0) {
		return $this->selectDB("SELECT {$col} FROM {$table} {$where}",$single);
	}



	public function selectDB($query,$single=0) {
		$result = $this->db_conn->query($query);
		$results = [];
		if($result->num_rows !=null){
			while ( $row = $result->fetch_object()) {

				if($single){
					return $row;
				}
				$results[] = $row;
			}
		}else{
			if($single){
				return 0;
			}
		}

		return $results;
	}






	/*------insert------*/
	public function insert($table, $data, $format='s') {
		$format = str_repeat('s',count($data));

		list( $fields, $placeholders, $values ) = $this->prep_query($data);
		array_unshift($values, $format); 
		$stmt = $this->db_conn->prepare("INSERT INTO {$table} ({$fields}) VALUES ({$placeholders})");
		call_user_func_array( array( $stmt, 'bind_param'), $this->ref_values($values));
		$stmt->execute();
		
		if ($stmt->affected_rows){
			return $stmt->insert_id;
		}
		
		return false;
	}
	/*------insert------*/




	public function update($table, $data, $where) {
		$format = str_repeat('s',(count($data)+count($where)));

		list( $fields, $placeholders, $values ) = $this->prep_query($data, 'update');
		$where_clause = '';
		$where_values = [];
		$count = 0;
		foreach ( $where as $field => $value ) {
			if ( $count > 0 ) {
				$where_clause .= ' AND ';
			}
			$where_clause .= $field . '=?';
			$where_values[] = $value;
			$count++;
		}
		array_unshift($values, $format);
		$values = array_merge($values, $where_values);
		$stmt = $this->db_conn->prepare("UPDATE {$table} SET {$placeholders} WHERE {$where_clause}");
		call_user_func_array( array( $stmt, 'bind_param'), $this->ref_values($values));
		$stmt->execute();

		// var_dump($stmt->error);

		if ( $stmt->affected_rows ) {
			return true;
		}
		return false;
	}



	



	




	



	private function prep_query($data, $type='insert') {
		$fields = '';
		$placeholders = '';
		$values = array();
		foreach ( $data as $field => $value ) {
			$fields .= "{$field},";
			$values[] = $value;
			if ( $type == 'update') {
				$placeholders .= $field . '=?,';
			} else {
				$placeholders .= '?,';
			}
		}
		$fields = substr($fields, 0, -1);
		$placeholders = substr($placeholders, 0, -1);
		return array( $fields, $placeholders, $values );
	}


	private function ref_values($array) {
		$refs = array();
		foreach ($array as $key => $value) {
			$refs[$key] = &$array[$key]; 
		}
		return $refs; 
	}
}



/*
prepared statement

$stmt = $db->db_conn->prepare("INSERT INTO blog_descriptions (`blog`, `chunks`) VALUES (?,?)");
$stmt->bind_param("is", $id, $chunks);

foreach($description as $chunks){
	echo $stmt->execute();
}
$stmt->close();


*/







?>