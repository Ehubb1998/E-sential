from flask.cli import AppGroup
from .users import seed_users, undo_users
from .bankInfo import seed_bank_info
from .watchList import seed_watchList
from .plans import seed_plans
from .stockInfo import seed_stockInfo

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_bank_info()
    seed_stockInfo()
    seed_plans()
    seed_watchList()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
